import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BodyLoginDto, BodyRegisterDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { TokenService } from 'src/token/token.service';
import { ErrorCreator } from 'src/libs/patterns/Error';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private response: ResponseService,
        private bcrypt: BcryptService,
        private token: TokenService,
        private errorHandler: ErrorHandlerService,
    ) { }

    async register({ email, password }: BodyRegisterDto) {
        try {

            //connect database
            await this.prisma.$connect();

            //check exist email
            const isExist = await this.prisma.users.findUnique({
                where: {
                    email,
                }
            });

            if (isExist) throw new BadRequestException(this.response.create(400, 'Email has already existed!', email));

            //encrypt pass
            const hashPass = await this.bcrypt.encode(password)

            //create new user
            await this.prisma.users.create({
                data: {
                    email,
                    pass_word: hashPass,
                }
            })

            //close connection
            await this.prisma.$disconnect();

            return this.response.create(201, 'Create successfully!', email);

        } catch (error) {
            console.log('error::', error);
            throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error', null))
        }

    }

    async login({ email, password }: BodyLoginDto) {
        try {

            //connect
            await this.prisma.$connect();

            //check email exist
            const isExist = await this.prisma.users.findUnique({
                where: {
                    email,
                }
            })
            if (!isExist) throw new NotFoundException(this.response.create(404, 'Account not found!', email));

            //check password
            const isCorrectPass = await this.bcrypt.decode(password, isExist.pass_word);
            if (!isCorrectPass) throw new BadRequestException(this.response.create(400, 'Email or password is not correct!', { email, password }));

            //create accessToken & refreshToken
            const accessToken = this.token.createAccess({
                userId: isExist.user_id,
                role: isExist.role,
            });

            const refreshToken = this.token.createRefresh({
                userId: isExist.user_id,
                role: isExist.role,
            })

            //save refresh to database
            const user = await this.prisma.users.update({
                data: {
                    refresh_token: refreshToken,
                },
                where: {
                    user_id: isExist.user_id,
                }
            })



            //close connection
            await this.prisma.$disconnect();

            return this.response.create(200, 'Login successfully!', { accessToken, refreshToken, full_name: user.full_name, avatar: user.avatar });

        } catch (error) {
            throw this.errorHandler.create(error.status, error.response);
        }

    }

    async refreshToken(userId: number, token: string) {
        try {

            //connect
            await this.prisma.$connect();

            //check userId exist
            const isExist = await this.prisma.users.findUnique({
                where: {
                    user_id: userId,
                }
            })

            if (!isExist) throw new NotFoundException(this.response.create(404, 'User not existed', null));



            //compare request token vs token's database
            const isEqual = token === isExist.refresh_token;
            if (!isEqual) throw new UnauthorizedException(this.response.create(401, 'Unauthorized', null));



            //decode token
            const payload = this.token.decode(token);


            //create new accessToken
            const accessToken = this.token.createAccess({ userId, role: payload.role }, '15m');

            //close connection
            await this.prisma.$disconnect();

            return this.response.create(200, 'Refresh successfully!', accessToken);

        } catch (error) {
            return this.errorHandler.create(error.status, error.response);
        }

    }
}

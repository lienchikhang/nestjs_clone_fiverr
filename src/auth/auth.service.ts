import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
            await this.prisma.users.update({
                data: {
                    refresh_token: refreshToken,
                },
                where: {
                    user_id: isExist.user_id,
                }
            })

            //close connection
            await this.prisma.$disconnect();

            return this.response.create(200, 'Login successfully!', { accessToken, refreshToken });

        } catch (error) {
            throw this.errorHandler.create(error.status, error.response);
        }

    }
}

import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { BodyDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private response: ResponseService,
        private bcrypt: BcryptService,
    ) { }

    async register({ email, password }: BodyDto) {
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
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { use } from 'passport';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';
import { BaseCondition, BodyUpdateDto } from './dto';
import { SlugService } from 'src/slug/slug.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { contains } from 'class-validator';
import { CompressImageService } from 'src/compress-image/compress-image.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import * as path from 'path';

@Injectable()
export class UserService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly response: ResponseService,
        private readonly errorHandler: ErrorHandlerService,
        private readonly slug: SlugService,
        private readonly bcrypt: BcryptService,
        private readonly compressImage: CompressImageService,
        private readonly cloudinary: CloudinaryService,
    ) { }

    async getUsers(pageSize: number = 10, page: number = 1, username?: string) {
        try {
            //connect
            await this.prisma.$connect();

            let baseCondition = {
                isDeleted: false,
            } as BaseCondition;

            //case getUser by username
            if (username) {
                baseCondition = {
                    ...baseCondition,
                    full_name: {
                        contains: this.slug.convert(username),
                    }
                }
            }

            const users = await this.prisma.users.findMany({
                select: {
                    full_name: true,
                    email: true,
                    phone: true,
                    birth_day: true,
                    gender: true,
                    skill: true,
                    certification: true,
                },
                where: baseCondition,
                take: pageSize,
                skip: (page - 1) * pageSize,
            });

            return this.response.create(200, 'Get successfully!', users);

        } catch (error) {

            console.log('error::', error);
            return this.errorHandler.create(error.status, error.response);

        } finally {

            //close connection
            await this.prisma.$disconnect();
        }
    }

    async delete(userId: number) {
        try {
            //connect
            await this.prisma.$connect();

            //check userId exist
            const isExist = await this.prisma.users.findUnique({
                where: {
                    user_id: userId,
                    isDeleted: false,
                }
            })

            if (!isExist) throw new NotFoundException(this.response.create(404, 'User not found!', null));

            //delete
            const rs = await this.prisma.users.update({
                select: {
                    user_id: true,
                    full_name: true,
                    email: true,
                },
                data: {
                    isDeleted: true,
                },
                where: {
                    user_id: userId,
                }
            })

            return this.response.create(200, 'Delete successfully!', rs);

        } catch (error) {

            return this.errorHandler.create(error.status, error.response);

        } finally {

            //close connection
            await this.prisma.$disconnect();
        }
    }

    async getUserById(userId: number) {
        try {

            //connect
            await this.prisma.$connect();

            //check userId exist
            const isExist = await this.prisma.users.findUnique({
                where: {
                    user_id: userId,
                    isDeleted: false,
                }
            })

            if (!isExist) throw new NotFoundException(this.response.create(404, 'User not found!', null));

            //get detail
            const user = await this.prisma.users.findUnique({
                select: {
                    full_name: true,
                    email: true,
                    phone: true,
                    birth_day: true,
                    gender: true,
                    skill: true,
                    certification: true,
                },
                where: {
                    user_id: userId,
                }
            })

            return this.response.create(200, 'Get successfully!', user);


        } catch (error) {

            return this.errorHandler.create(error.status, error.response);

        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async updateUser(userId: number, bodyUser: BodyUpdateDto) {
        try {

            //connect
            await this.prisma.$connect();

            const isExist = await this.prisma.users.findUnique({
                where: {
                    user_id: userId,
                    isDeleted: false,
                }
            })

            if (!isExist) throw new NotFoundException(this.response.create(404, 'User not found!', null));


            //case update password
            if (bodyUser.pass_word) {
                bodyUser.pass_word = await this.bcrypt.encode(bodyUser.pass_word);
            }

            //case update fullname
            if (bodyUser.full_name) {
                bodyUser.full_name = await this.slug.convert(bodyUser.full_name);
            }


            //update
            const rs = await this.prisma.users.update({
                data: bodyUser,
                where: {
                    user_id: userId,
                }
            })

            return this.response.create(200, 'Update successfully!', rs);

        } catch (error) {

            return this.errorHandler.create(error.status, error.response);

        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async uploadImage(userId: number, file: Express.Multer.File) {
        try {

            //connect
            await this.prisma.$connect();

            console.log({ file });

            const isExist = await this.prisma.users.findUnique({
                where: {
                    user_id: userId,
                    isDeleted: false,
                }
            })

            if (!isExist) throw new NotFoundException(this.response.create(404, 'User not found!', null));

            //compress image
            await this.compressImage.start(file.filename);

            //upload
            const rs = await this.cloudinary.upload(file.filename);

            return this.response.create(200, 'Upload successfully!', rs.url);

        } catch (error) {

            return this.errorHandler.create(error.status, error.response);

        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }
}

/**
 * try {

            //connect
            await this.prisma.$connect();
            
        } catch (error) {
            
            return this.errorHandler.create(error.status, error.response);

        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
 */
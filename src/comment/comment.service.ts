import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';
import { BodyCreateDto, BodyUpdateDto } from './dto';

@Injectable()
export class CommentService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly errorHandler: ErrorHandlerService,
        private readonly response: ResponseService,
    ) { }

    async getByJobId(jobId: number, page: number = 1, pageSize: number = 5) {
        try {
            //open connect
            await this.prisma.$connect();

            //check job exist
            const isExist = await this.prisma.jobs.findUnique({
                where: {
                    job_id: jobId,
                }
            });

            if (!isExist) throw new NotFoundException(this.response.create(HttpStatus.NOT_FOUND, 'Job not found', null));

            const comments = await this.prisma.comments.findMany({
                select: {
                    content: true,
                    createdAt: true,
                    Users: {
                        select: {
                            avatar: true,
                            full_name: true,
                        }
                    },
                    stars: true,
                },
                where: {
                    job_id: isExist.job_id,
                    isDeleted: false,
                },
                take: pageSize,
                skip: (page - 1) * pageSize,
            });

            const totalComment = await this.prisma.comments.count({
                where: {
                    job_id: isExist.job_id,
                    isDeleted: false,
                }
            });

            const totalPage = Math.ceil(totalComment / pageSize);

            return this.response.create(HttpStatus.OK, 'Get successfully!', { data: comments, page: totalPage });

        } catch (error) {

            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);

        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async add(userId: number, jobId: number, data: BodyCreateDto) {
        try {
            //open connect
            await this.prisma.$connect();

            //check job exist
            const isExist = await this.prisma.jobs.findUnique({
                where: {
                    job_id: jobId,
                }
            });

            if (!isExist) throw new NotFoundException(this.response.create(HttpStatus.NOT_FOUND, 'Job not found', null));

            const rs = await this.prisma.comments.create({
                data: {
                    job_id: jobId,
                    user_id: userId,
                    createdAt: new Date(),
                    content: data.content,
                    stars: data.stars,
                },
            });

            return this.response.create(HttpStatus.CREATED, 'Add successfully!', rs);


        } catch (error) {

            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);

        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async delete(cmtId: number, userId: number) {
        try {
            //open connect
            await this.prisma.$connect();

            //check job exist
            const isExist = await this.prisma.comments.findUnique({
                where: {
                    id: cmtId,
                }
            });

            if (!isExist) throw new NotFoundException(this.response.create(HttpStatus.NOT_FOUND, 'Comment not found', null));

            //check userId === userId's exist comment
            if (userId !== isExist.user_id) throw new BadRequestException(this.response.create(HttpStatus.BAD_REQUEST, 'User dont have permission', null));

            //delete
            const rs = await this.prisma.comments.update({
                data: {
                    isDeleted: true,
                },
                where: {
                    id: cmtId,
                }
            });

            return this.response.create(HttpStatus.OK, 'Delete successfully!', rs);

        } catch (error) {

            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);

        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async update(cmtId: number, userId: number, data: BodyUpdateDto) {
        try {
            //open connect
            await this.prisma.$connect();

            //check job exist
            const isExist = await this.prisma.comments.findUnique({
                where: {
                    id: cmtId,
                }
            });

            if (!isExist) throw new NotFoundException(this.response.create(HttpStatus.NOT_FOUND, 'Comment not found', null));

            //check userId === userId's exist comment
            if (userId !== isExist.user_id) throw new BadRequestException(this.response.create(HttpStatus.BAD_REQUEST, 'User dont have permission', null));

            //update
            const rs = await this.prisma.comments.update({
                data,
                where: {
                    id: cmtId,
                }
            });

            return this.response.create(HttpStatus.OK, 'Update successfully!', rs);

        } catch (error) {

            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);

        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }
}

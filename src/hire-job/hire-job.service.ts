import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';
import { bodyHiredJobDto, bodyHiredJobUpdateDto } from './dto';

@Injectable()
export class HireJobService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly response: ResponseService,
        private readonly errorHandle: ErrorHandlerService,
    ) { }

    async getAll(pageSize: number = 10, page: number = 1) {
        try {
            //connect
            await this.prisma.$connect();

            const hiredJobs = await this.prisma.hireJobs.findMany({
                where: {},
                take: pageSize,
                skip: (page - 1) * pageSize,
            });

            const total = await this.prisma.hireJobs.count();

            const totalPage = Math.ceil(total / pageSize);

            return this.response.create(HttpStatus.OK, 'Get successfully!', { data: hiredJobs, page: totalPage });

        } catch (error) {
            console.log('error::', error);
            return this.errorHandle.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async getHiredJobById(hiredJobId: number) {
        try {
            //connect
            await this.prisma.$connect();

            const isExist = await this.prisma.hireJobs.findUnique({
                select: {
                    hire_date: true,
                    is_done: true,
                    Users: {
                        select: {
                            avatar: true,
                            full_name: true,
                            email: true,
                        }
                    },
                },
                where: {
                    id: hiredJobId,
                    isDeleted: false,
                }
            })

            if (!isExist) throw new NotFoundException(this.response.create(HttpStatus.NOT_FOUND, 'Hired job not found', null));

            return this.response.create(HttpStatus.OK, 'Get successfully!', isExist);


        } catch (error) {
            console.log('error::', error);
            return this.errorHandle.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async hire({ job_id }: bodyHiredJobDto, userId: number) {
        try {
            //connect
            await this.prisma.$connect();

            //check job exist
            const isExist = await this.prisma.jobs.findUnique({
                where: {
                    job_id,
                }
            });

            if (!isExist) throw new NotFoundException(this.response.create(HttpStatus.NOT_FOUND, 'Job not found', null));

            //hire job
            const rs = await this.prisma.hireJobs.create({
                data: {
                    user_id: userId,
                    job_id: isExist.job_id,
                    hire_date: new Date(),
                }
            })

            return this.response.create(HttpStatus.CREATED, 'Hire successfully!', rs);

        } catch (error) {
            console.log('error::', error);
            return this.errorHandle.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async updateHiredJob(hiredJobId: number, body: bodyHiredJobUpdateDto) {
        try {
            //connect
            await this.prisma.$connect();

            //check job exist
            const isExist = await this.prisma.jobs.findUnique({
                where: {
                    job_id: hiredJobId,
                }
            });

            if (!isExist) throw new NotFoundException(this.response.create(HttpStatus.NOT_FOUND, 'Job not found', null));


        } catch (error) {
            console.log('error::', error);
            return this.errorHandle.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async deleteHiredJob(hiredJobId: number) {
        try {
            //connect
            await this.prisma.$connect();

            //check job exist
            const isExist = await this.prisma.hireJobs.findUnique({
                where: {
                    id: hiredJobId,
                }
            });

            if (!isExist) throw new NotFoundException(this.response.create(HttpStatus.NOT_FOUND, 'Hired job not found', null));

            //delete
            const rs = await this.prisma.hireJobs.update({
                data: {
                    isDeleted: true,
                },
                where: {
                    id: isExist.id
                }
            });

            return this.response.create(HttpStatus.OK, 'delete successfull!', rs);


        } catch (error) {
            console.log('error::', error);
            return this.errorHandle.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async getHiredJobsByUserId(userId: number, page: number = 1, pageSize: number = 10) {
        try {
            //connect
            await this.prisma.$connect();

            const rs = await this.prisma.hireJobs.findFirst({
                where: {
                    user_id: userId,
                },
                take: pageSize,
                skip: (page - 1) * pageSize,
            });

            const total = await this.prisma.hireJobs.count({
                where: {
                    user_id: userId,
                },
            });

            const totalPage = Math.ceil(total / pageSize);

            return this.response.create(HttpStatus.OK, 'Get successfull!', { data: rs, page: totalPage });


        } catch (error) {
            console.log('error::', error);
            return this.errorHandle.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async finishHiredJob(hiredJobId: number, userId: number) {
        try {
            //connect
            await this.prisma.$connect();

            //check hiredJob exist
            const isExist = await this.prisma.hireJobs.findUnique({
                where: {
                    id: hiredJobId,
                    isDeleted: false,
                }
            });

            if (!isExist) throw new NotFoundException(this.response.create(HttpStatus.NOT_FOUND, 'Hired job not found', null));

            //check userId
            if (userId !== isExist.id) throw new BadRequestException(this.response.create(HttpStatus.BAD_REQUEST, 'Bad request', null));

            //update finish
            const rs = await this.prisma.hireJobs.update({
                data: {
                    is_done: true,
                },
                where: {
                    id: isExist.id,
                }
            });

            return this.response.create(HttpStatus.OK, 'Finish hired job', rs);

        } catch (error) {
            console.log('error::', error);
            return this.errorHandle.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }
    /**
     * try {
            //connect
            await this.prisma.$connect();


        } catch (error) {
            console.log('error::', error);
            return this.errorHandle.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
     */

}

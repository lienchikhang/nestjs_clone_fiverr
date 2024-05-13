import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { BodyJobType } from './dto';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';
import { SlugService } from 'src/slug/slug.service';

@Injectable()
export class JobTypeService {
    constructor(
        private errorHandler: ErrorHandlerService,
        private prisma: PrismaService,
        private response: ResponseService,
        private slug: SlugService,
    ) { }

    async create({ jobTypeName }: BodyJobType) {
        try {

            //connect
            await this.prisma.$connect();

            //check exist name
            const isExist = await this.prisma.jobTypes.findFirst({
                where: {
                    job_type_name: this.slug.convert(jobTypeName),
                }
            })

            if (isExist) throw new ConflictException(this.response.create(409, 'Type\'s name has already existed', jobTypeName));

            //create new job type
            const newJobType = await this.prisma.jobTypes.create({
                data: {
                    job_type_name: this.slug.convert(jobTypeName),
                },
            })

            //close connection
            await this.prisma.$disconnect();

            return this.response.create(201, 'Create successfully!', newJobType);

        } catch (error) {
            return this.errorHandler.create(error.status, error.response);
        }
    }

    async getAll(pageSize: number = 4, page: number = 1) {
        try {


            //connect
            await this.prisma.$connect();

            //get all jobtypes
            const jobtypes = await this.prisma.jobTypes.findMany({
                where: {
                    isDeleted: false,
                },
                take: pageSize,
                skip: (page - 1) * pageSize,
            })

            //cal total page
            const totalEle = await this.prisma.jobTypes.count({
                where: {
                    isDeleted: false,
                }
            });

            const totalPage = Math.ceil(totalEle / pageSize);

            //create response
            const res = {
                data: jobtypes,
                totalPage,
            }

            //close connection
            await this.prisma.$disconnect();

            return this.response.create(200, 'Get successfully!', res);

        } catch (error) {
            console.log('error', error);
            return this.errorHandler.create(error.status, error.response);
        }
    }

    async getDetailById(id: number) {
        try {

            //connect
            await this.prisma.$connect();

            //get detail
            const jobType = await this.prisma.jobTypes.findUnique({
                where: {
                    id,
                }
            })


            //check exist
            if (!jobType) throw new NotFoundException(this.response.create(404, 'Type not found', null));

            //close connection
            await this.prisma.$disconnect();

            return this.response.create(200, 'Get successfully!', jobType);

        } catch (error) {
            console.log('error', error);
            return this.errorHandler.create(error.status, error.response);
        }
    }

    async update(id: number, { jobTypeName }: BodyJobType) {
        try {

            //connect
            await this.prisma.$connect();

            //check exist
            const isExist = await this.prisma.jobTypes.findUnique({
                where: {
                    id,
                }
            })

            if (!isExist) throw new NotFoundException(this.response.create(404, 'Type not found', null));

            //update
            const updatedJobType = await this.prisma.jobTypes.update({
                select: {
                    id: true,
                    job_type_name: true
                },
                where: {
                    id: isExist.id,
                },
                data: {
                    job_type_name: this.slug.convert(jobTypeName),
                }
            });

            //close connection
            await this.prisma.$disconnect();

            return this.response.create(200, 'Update successfully!', updatedJobType);

        } catch (error) {
            console.log('error', error);
            return this.errorHandler.create(error.status, error.response);
        }
    }

    async delete(id: number) {
        try {

            //connect
            await this.prisma.$connect();

            //check exist
            const isExist = await this.prisma.jobTypes.findUnique({
                where: {
                    id,
                }
            })

            if (!isExist) throw new NotFoundException(this.response.create(404, 'Type not found', null));

            const deleteType = await this.prisma.jobTypes.update({
                select: {
                    id: true,
                    job_type_name: true
                },
                where: {
                    id: isExist.id,
                },
                data: {
                    isDeleted: true
                }
            })

            //close connection
            await this.prisma.$disconnect();

            return this.response.create(200, 'Delete successfully!', deleteType);

        } catch (error) {
            console.log('error', error);
            return this.errorHandler.create(error.status, error.response);
        }
    }
}

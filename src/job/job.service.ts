import { Injectable, NotFoundException } from '@nestjs/common';
import { CompressImageService } from 'src/compress-image/compress-image.service';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';
import { SlugService } from 'src/slug/slug.service';
import { BodyCreateJobDto } from './dto';
import { BodyUpdateDto } from 'src/user/dto';

@Injectable()
export class JobService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly errorHandler: ErrorHandlerService,
        private readonly response: ResponseService,
        private readonly compress: CompressImageService,
        private readonly slug: SlugService,
    ) { }


    async getAll(pageSize: number = 10, page: number = 1) {
        try {

            //connect
            await this.prisma.$connect();

            //get jobs
            const jobs = await this.prisma.jobs.findMany({
                select: {
                    job_id: true,
                    job_short_desc: true,
                    image: true,
                    price: true,
                    star: true,
                    rate: true,
                },
                where: {

                },
                take: pageSize,
                skip: (page - 1) * pageSize,
            });

            //get total jobs
            const total = await this.prisma.jobs.count();

            //get total page
            const totalPage = Math.ceil(total / pageSize);

            return this.response.create(200, 'Get successfully!', { data: jobs, page: totalPage });

        } catch (error) {
            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async getDetailById(jobId: number) {
        try {

            //connect
            await this.prisma.$connect();

        } catch (error) {
            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async create({ job_name, job_detail_type_id, job_detail_type_link_id, ...rest }: BodyCreateJobDto, userId: any) {
        try {

            //connect
            await this.prisma.$connect();

            //check job_detail_type exist
            const isExistDetailType = await this.prisma.detailJobTypes.findUnique({
                where: {
                    job_detail_type_id: job_detail_type_id,
                }
            })

            if (!isExistDetailType) throw new NotFoundException(this.response.create(404, 'Detail type not found', null));

            //check job_detail_type_link exist
            const isExistDetailTypeLink = await this.prisma.detailJobTypeLinks.findUnique({
                where: {
                    id: job_detail_type_link_id,
                }
            })

            if (!isExistDetailTypeLink) throw new NotFoundException(this.response.create(404, 'Detail type link not found', null));

            //convert string to slug
            job_name = this.slug.convert(job_name);

            const rs = await this.prisma.jobs.create({
                data: {
                    job_creator: userId,
                    job_name,
                    job_detail_type_id,
                    job_detail_type_link_id,
                    ...rest,
                },
            })

            return this.response.create(201, 'Create successfully!', rs);

        } catch (error) {
            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async update(jobId: number, data: BodyUpdateDto) {
        try {

            //connect
            await this.prisma.$connect();

        } catch (error) {
            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async delete(jobId: number) {
        try {

            //connect
            await this.prisma.$connect();

        } catch (error) {
            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async uploadImage(jobId: number) {
        try {

            //connect
            await this.prisma.$connect();

        } catch (error) {
            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }



}

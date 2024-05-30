import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CompressImageService } from 'src/compress-image/compress-image.service';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';
import { SlugService } from 'src/slug/slug.service';
import { BodyCreateJobDto } from './dto';
import { BodyUpdateDto } from 'src/user/dto';
import { bodyUpdateJobDto } from './dto/bodyUpdateJob.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class JobService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly errorHandler: ErrorHandlerService,
        private readonly response: ResponseService,
        private readonly compress: CompressImageService,
        private readonly slug: SlugService,
        private readonly cloudinary: CloudinaryService,
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
                    isDeleted: false,
                },
                take: pageSize,
                skip: (page - 1) * pageSize,
            });

            //get total jobs
            const total = await this.prisma.jobs.count();

            //get total page
            const totalPage = Math.ceil(total / pageSize);

            return this.response.create(HttpStatus.OK, 'Get successfully!', { data: jobs, page: totalPage });

        } catch (error) {
            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async getDetailById(jobId: number, pageCmt: number = 1) {
        try {

            //connect
            await this.prisma.$connect();

            const job = await this.prisma.jobs.findUnique({
                select: {
                    job_name: true,
                    rate: true,
                    star: true,
                    job_desc: true,
                    image: true,
                    price: true,
                    job_short_desc: true,
                    Users: {
                        select: {
                            avatar: true,
                            full_name: true,
                        }
                    },
                    Comments: {
                        select: {
                            stars: true,
                            createdAt: true,
                            content: true,
                            Users: {
                                select: {
                                    avatar: true,
                                    full_name: true,
                                }
                            }
                        },
                        take: 5,
                        skip: (pageCmt - 1) * 5
                    }
                },
                where: {
                    job_id: jobId,
                    isDeleted: false,
                }
            })

            if (!job) throw new NotFoundException(this.response.create(HttpStatus.NOT_FOUND, 'Job not found', null));

            //get total comment
            const totalCmt = await this.prisma.comments.count({
                where: {
                    job_id: jobId
                }
            })

            const totalPageCmt = Math.ceil(totalCmt / 5);

            return this.response.create(HttpStatus.OK, 'Get successfully!', { data: job, page: totalPageCmt });

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

            return this.response.create(HttpStatus.CREATED, 'Create successfully!', rs);

        } catch (error) {
            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }

    async update(jobId: number, { job_name, ...rest }: bodyUpdateJobDto, userId: number) {
        try {

            //connect
            await this.prisma.$connect();

            //check job exist
            const isExist = await this.prisma.jobs.findUnique({
                where: {
                    job_id: jobId,
                }
            })

            if (!isExist) throw new NotFoundException(this.response.create(HttpStatus.NOT_FOUND, 'Job not found', null));

            //check userId valid
            if (!(userId === isExist.job_creator)) throw new BadRequestException(this.response.create(HttpStatus.BAD_REQUEST, 'Dont have permission!', null));

            //case update job_name
            if (job_name) {
                job_name = this.slug.convert(job_name);
            }

            //update
            const rs = await this.prisma.jobs.update({
                data: {
                    job_name,
                    ...rest,
                },
                where: {
                    job_id: jobId,
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

    async delete(jobId: number, userId: number) {
        try {

            //connect
            await this.prisma.$connect();

            //check job exist
            const isExist = await this.prisma.jobs.findUnique({
                where: {
                    job_id: jobId,
                }
            });

            if (!isExist) throw new NotFoundException(this.response.create(HttpStatus.NOT_FOUND, 'Job not found!', null));

            //check userId valid
            if (userId !== isExist.job_creator) throw new BadRequestException(this.response.create(HttpStatus.BAD_REQUEST, 'Dont have permission', null));

            //delete
            const rs = await this.prisma.jobs.update({
                data: {
                    isDeleted: true,
                },
                where: {
                    job_id: isExist.job_id,
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

    async uploadImage(jobId: number, userId: number, file: Express.Multer.File) {
        try {

            //connect
            await this.prisma.$connect();

            //check exist job
            const isExist = await this.prisma.jobs.findUnique({
                where: {
                    job_id: jobId,
                }
            })

            if (!isExist) throw new NotFoundException(this.response.create(HttpStatus.NOT_FOUND, 'Job not found', null));

            //check userId valid
            if (userId !== isExist.job_creator) throw new BadRequestException(this.response.create(HttpStatus.BAD_REQUEST, 'Dont have permission', null));

            //compress image
            await this.compress.start(file.filename);

            //upload
            const rs = await this.cloudinary.upload(file.filename);

            return this.response.create(HttpStatus.OK, 'Upload successfully!', rs.url);


        } catch (error) {
            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);
        } finally {
            //close connection
            await this.prisma.$disconnect();
        }
    }



}

import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BodyDetailJobType, BodyDetailJobTypeLink, BodyDetailJobTypeUpdate, DetailJobTypeLink, DetailJobTypeLinkUpdate } from './dto';
import { ResponseService } from 'src/response/response.service';
import { SlugService } from 'src/slug/slug.service';
import { CompressImageService } from 'src/compress-image/compress-image.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class DetailJobTypeService {
    constructor(
        private errorHandler: ErrorHandlerService,
        private prisma: PrismaService,
        private response: ResponseService,
        private slug: SlugService,
        private compressImage: CompressImageService,
        private cloudinary: CloudinaryService,
    ) { }

    async create({ detailTypeName, jobTypeId }: BodyDetailJobType) {
        try {
            //connect
            await this.prisma.$connect();

            //check jobType's id exist
            const isExist = await this.prisma.jobTypes.findUnique({
                where: {
                    id: jobTypeId,
                    isDeleted: false,
                }
            })

            if (!isExist) throw new NotFoundException(this.response.create(404, 'Type not found', null));

            //create new detailType
            const detailType = await this.prisma.detailJobTypes.create({
                select: {
                    detail_type_name: true,
                    image: true,
                },
                data: {
                    detail_type_name: this.slug.convert(detailTypeName),
                    job_type_id: jobTypeId,
                }
            })

            //close connection
            await this.prisma.$disconnect();

            return this.response.create(201, 'Create successfully!', detailType);

        } catch (error) {
            console.log('error::', error);
            return this.errorHandler.create(error.status, error.response);
        }
    }

    async uploadImage(file: Express.Multer.File, detailJobTypeId: number) {
        try {

            console.log('file in uploadImage', file)

            //connect
            await this.prisma.$connect();

            //compress image
            await this.compressImage.start(file.filename);

            //upload to cloudinary
            const rs = await this.cloudinary.upload(file.filename);

            //update detailJob
            await this.prisma.detailJobTypes.update({
                where: {
                    job_detail_type_id: detailJobTypeId,
                },
                data: {
                    image: rs.url,
                }
            })

            //close connection
            await this.prisma.$disconnect();

            return this.response.create(201, 'Upload successfully!', rs.url);

        } catch (error) {
            console.log('error::', error);
            return this.errorHandler.create(error.status, error.response);
        }

    }

    async createLinks({ links, jobDetailTypeId }: BodyDetailJobTypeLink) {
        try {

            //connect
            await this.prisma.$connect();

            //check jobDetailTypeId exist
            const isExist = await this.prisma.detailJobTypes.findUnique({
                where: {
                    job_detail_type_id: jobDetailTypeId,
                    isDeleted: false,
                }
            })

            if (!isExist) throw new NotFoundException(this.response.create(404, 'Detail type not found', null));

            //createLinks
            for (const link of links) {
                await this.prisma.detailJobTypeLinks.create({
                    data: {
                        detail_type_link_name: this.slug.convert(link.detailTypeLinkName),
                        job_detail_type_id: jobDetailTypeId
                    }
                })
            }

            //close connection
            await this.prisma.$disconnect();

            return this.response.create(201, 'Create successfully!', null);


        } catch (error) {
            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);
        }
    }


    async getAll() {
        try {

            //connect
            await this.prisma.$connect();

            const rs = await this.prisma.detailJobTypes.findMany({
                select: {
                    job_detail_type_id: true,
                    detail_type_name: true,
                    DetailJobTypeLinks: {
                        select: {
                            detail_type_link_name: true,
                            id: true,
                        },
                        where: {
                            isDeleted: false,
                        }
                    }
                },
                where: {
                    isDeleted: false,
                }
            })

            //close connection
            await this.prisma.$disconnect();

            return this.response.create(200, 'Get successfully!', rs);

        } catch (error) {
            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);
        }
    }

    async getDetailById(jobDetailTypeId: number) {

        try {

            //connect
            await this.prisma.$connect();

            const detailJobType = await this.prisma.detailJobTypes.findUnique({
                select: {
                    detail_type_name: true,
                    job_type_id: true,
                    DetailJobTypeLinks: {
                        select: {
                            detail_type_link_name: true,
                            id: true,
                        }
                    }
                },
                where: {
                    job_detail_type_id: jobDetailTypeId
                }
            })

            //close connection
            await this.prisma.$disconnect();

            return this.response.create(200, 'Get successfully!', detailJobType);

        } catch (error) {
            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);
        }

    }

    async update(body: BodyDetailJobTypeUpdate, detailJobTypeId: number) {
        try {

            //connect
            await this.prisma.$connect();

            //check detailJobTypeId exist
            const isExistDetailJob = await this.prisma.detailJobTypes.findUnique({
                where: {
                    job_detail_type_id: detailJobTypeId,
                }
            })

            if (!isExistDetailJob) throw new NotFoundException(this.response.create(404, 'Detail type not found', null));


            //check jobType exist
            const isExistJobType = await this.prisma.jobTypes.findUnique({
                where: {
                    id: body.job_type_id,
                }
            })

            if (!isExistJobType) throw new NotFoundException(this.response.create(404, 'Job type not found', null));

            //check if detail_job_type_name exist
            if (body.detail_type_name) {
                body.detail_type_name = this.slug.convert(body.detail_type_name);
            }

            const updatedDetailJobType = await this.prisma.detailJobTypes.update({
                select: {
                    detail_type_name: true,
                    image: true,
                },
                where: {
                    job_detail_type_id: detailJobTypeId,
                },
                data: body
            })

            //close connection
            await this.prisma.$disconnect();

            return this.response.create(200, 'Update successfully!', updatedDetailJobType)

        } catch (error) {
            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);
        }
    }

    async updateLink(body: DetailJobTypeLinkUpdate, detailTypeLink: number) {
        try {

            //connect
            await this.prisma.$connect();

            //check detailJobTypeId exist
            const isExistdetailTypeLink = await this.prisma.detailJobTypeLinks.findUnique({
                where: {
                    id: detailTypeLink,
                }
            })

            if (!isExistdetailTypeLink) throw new NotFoundException(this.response.create(404, 'Detail type link not found', null));


            //check detailJobType exist
            if (body.job_detail_type_id) {
                const isExistDetailJobType = await this.prisma.detailJobTypes.findUnique({
                    where: {
                        job_detail_type_id: body.job_detail_type_id,
                    }
                })

                if (!isExistDetailJobType) throw new NotFoundException(this.response.create(404, 'Detail job type not found', null));
            }

            //check detailTypeLinkName exist
            if (body.detail_type_link_name) {
                body.detail_type_link_name = this.slug.convert(body.detail_type_link_name);
            }

            const updatedDetailJobTypeLink = await this.prisma.detailJobTypeLinks.update({
                select: {
                    detail_type_link_name: true,
                },
                where: {
                    id: detailTypeLink,
                },
                data: body
            })

            //close connection
            await this.prisma.$disconnect();

            return this.response.create(200, 'Update successfully!', updatedDetailJobTypeLink)

        } catch (error) {
            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);
        }
    }

    async delete(detailJobTypeId: number) {
        try {
            //connect
            await this.prisma.$connect();

            const rs = await this.prisma.detailJobTypes.update({
                where: {
                    job_detail_type_id: detailJobTypeId,
                },
                data: {
                    isDeleted: true,
                }
            })

            //close connection
            await this.prisma.$disconnect();

            return this.response.create(200, 'Delete successfully!', rs);


        } catch (error) {
            console.log('error:: ', error);
            return this.errorHandler.create(error.status, error.response);
        }
    }



}

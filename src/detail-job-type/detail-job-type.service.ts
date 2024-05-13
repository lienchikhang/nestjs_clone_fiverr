import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BodyDetailJobType, BodyDetailJobTypeLink } from './dto';
import { ResponseService } from 'src/response/response.service';
import { SlugService } from 'src/slug/slug.service';

@Injectable()
export class DetailJobTypeService {
    constructor(
        private errorHandler: ErrorHandlerService,
        private prisma: PrismaService,
        private response: ResponseService,
        private slug: SlugService,
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

    async getDetailById() {

    }

    async update() {

    }

    async delete() {

    }



}

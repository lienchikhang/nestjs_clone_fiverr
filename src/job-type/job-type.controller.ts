import { Controller } from '@nestjs/common';
import { JobTypeService } from './job-type.service';

@Controller('job-type')
export class JobTypeController {
  constructor(private readonly jobTypeService: JobTypeService) {}
}

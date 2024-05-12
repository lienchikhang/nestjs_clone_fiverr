import { Injectable } from '@nestjs/common';
import { ErrorCreator } from 'src/libs/patterns/Error';

// const errorCreator = new ErrorCreator();

@Injectable()
export class ErrorHandlerService {
    create(type: number, payload: any) {
        ErrorCreator.create(type, payload).send();
    }
}

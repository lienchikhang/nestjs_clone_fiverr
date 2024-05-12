import { BadRequestException, NotFoundException } from "@nestjs/common";

export class ErrorCreator {
    static create(type: number, payload) {
        switch (type) {
            case 400:
                return new ErrorBadRequest(payload);
            case 404:
                return new ErrorNotFound(payload);
            case 500:
                return new ErrorInternalServer(payload);

        }
    }
}

export class ErrorBadRequest {
    constructor(private payload) {
    }

    send() {
        throw new BadRequestException(this.payload);
    }
}

export class ErrorInternalServer {
    constructor(private payload) {
    }

    send() {
        throw new ErrorInternalServer(this.payload);
    }
}

export class ErrorNotFound {
    constructor(private payload) {
    }

    send() {
        throw new NotFoundException(this.payload);
    }
}
import { BadRequestException, ForbiddenException, NotFoundException, UnauthorizedException } from "@nestjs/common";

export class ErrorCreator {
    static create(type: number, payload) {
        switch (type) {
            case 400:
                return new ErrorBadRequest(payload);
            case 401:
                return new ErrorUnAuthorized(payload);
            case 403:
                return new ErrorForbidden(payload);
            case 404:
                return new ErrorNotFound(payload);
            default:
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

export class ErrorForbidden {
    constructor(private payload) {
    }

    send() {
        throw new ForbiddenException(this.payload);
    }
}

export class ErrorUnAuthorized {
    constructor(private payload) {
    }

    send() {
        throw new UnauthorizedException(this.payload);
    }
}

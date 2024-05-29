import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JsonWebTokenError, TokenExpiredError } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { ResponseService } from "src/response/response.service";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CustomGuard extends AuthGuard('jwt') {
    constructor(private responseService: ResponseService) {
        super();

    }
    handleRequest(err, user, info: Error, context: ExecutionContext) {
        if (info instanceof TokenExpiredError) {
            throw new UnauthorizedException(this.responseService.create(401, 'TokenExpiredError', null));
        } else if (info instanceof JsonWebTokenError) {
            throw new UnauthorizedException(this.responseService.create(403, 'JsonWebTokenError', null));
        }
        else {
            const token = this.extractTokenFromRequest(context);
            const payload = this.decodeToken(token)
            return payload?.userId;
        }
    }

    private extractTokenFromRequest(context: ExecutionContext): string {
        const request = context.switchToHttp().getRequest();
        // Thay đổi cách bạn trích xuất token từ yêu cầu dựa trên cách bạn gửi token trong yêu cầu
        const token = request.headers.authorization.split(' ')[1];
        return token;
    }

    private decodeToken(token: string): any {
        try {
            const decoded = jwt.decode(token);
            return decoded;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
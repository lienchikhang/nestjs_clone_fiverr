import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenService } from 'src/token/token.service';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { ErrorHandlerService } from 'src/error-handler/error-handler.service';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class AuthRefreshService extends AuthGuard('jwt') {

    constructor(
        private config: ConfigService,
        private errorHandler: ErrorHandlerService,
    ) {
        super();
    }

    handleRequest(err, user, info: Error, context: ExecutionContext): any {
        try {
            //get token
            const refreshToken = this.extractTokenFromRequest(context);

            console.log({ refreshToken })

            //verify refreshToken
            const payload = this.verifyToken(refreshToken);

            return { payload, refreshToken };
        } catch (error) {
            if (error instanceof TokenExpiredError)
                return this.errorHandler.create(403, {
                    status: 403, mess: 'loginExpired', content: null
                })

            if (error instanceof JsonWebTokenError)
                return this.errorHandler.create(401, {
                    status: 401, mess: 'JsonWebTokenRefreshError', content: null
                })
        }
    }

    private extractTokenFromRequest(context: ExecutionContext): string {
        const request = context.switchToHttp().getRequest();
        return request.headers.authorization.split(' ')[1];
    }

    private verifyToken(token: string) {
        return verify(token, this.config.get('SECRET_REFRESH_TOKEN'))
    }

}

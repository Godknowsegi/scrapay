import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
import { expressjwt as jwt, GetVerificationKey } from 'express-jwt';
@Injectable()
export class Jwt implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const response = ctx.getContext().res;
    const domain = this.configService.get('auth.domain');
    const id = this.configService.get('auth.id');

    const verify = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://${domain}/.well-known/jwks.json`,
        }) as GetVerificationKey,
        audience: id,
        issuer: `https://${domain}/`,

        algorithms: ['RS256'],
      }),
    );

    try {
      await verify(request, response);
      return true;
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}

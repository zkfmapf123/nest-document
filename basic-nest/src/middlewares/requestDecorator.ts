import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserAgent = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest()?.headers;
    return req['user-agent'];
  },
);

# Basic-Nest

### Cli

- Nest는 Rails와 같이 Cli형태로 동작이 가능하다

```
  nest --help
```

### 폴더구조

```
  ...controller.ts         > 단일 경로의 기본 컨트롤러
  ...controller.spec.ts    > 단위 테스트
  ...module.ts             > 응용 프로그램의 루트 모듈 (+controller...)
  ...service.ts            > 단일 메서드를 사용하는 기본 서비스
```

### Nest Factory

- main.ts에서 NestFactory의 Static 메서드를 활용한다.

```
  create                      > 기본 설정
  createMicroservice          > 마이크로 서비스용
  createApplicationContext    > 이건뭐지? 인스턴스용?

```

## Controller...

### Request Option

- Decorator 천국
- 해당 데코레이터 따라해서 응용해서 사용해도 될듯 (https://docs.nestjs.com/custom-decorators)

  ```ts
  export const UserAgent = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const req = ctx.switchToHttp().getRequest()?.headers;
      return req['user-agent'];
    },
  );
  ```

```
  @Req  -> Express
  @Res  -> Express
  @Next -> Express

  @Session()
  @Param(key?: string)
  @Body(key?: string)
  @Query(key?: string)
  @Headers(name?: string)
  @Ip()
  @HostParam()


```

### 쓸만한 Decorators

- @Header
- @HttpCode
- @Redirect
- ...

### Serialize \*\*\*

- Nest에서는 DTO형태로 시리얼라이즈를 진행한다

## Provider..

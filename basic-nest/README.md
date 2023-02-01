# Basic-Nest

## Basic

<hr>
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

<hr>
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

<hr>

### DI (Dependency Injection)

- Express에서는 Inversify로 의존성역전을 구축하였다 -> 설정 너무 빡셈
- Nest에서는 @Injectable() 데코레이터로 구현이 가능하다
- Module에 적용 + Controller 생성자 단에서 설정

### Provider의 수명 주기

- 모든 Provider는 app -> bootstrap이 진행되는 동안 모든 Provider가 인스턴스화 된다
  - 즉, npm run start -> os.Exit(1) 되는 순간까지 계속 살아있다는 뜻이다.
  - 근데 그렇다는건 메모리가 그만큼 계속 쌓이겠지? 수명주기를 관리하는 방법이 존재함
- 수명주기 관리(https://docs.nestjs.com/fundamentals/injection-scopes)
  - Default (왠만하면 기본값을 사용하자)
    - 기본값, 단일 인스턴스로써, bootStrap 수명주기와 같다.
  - Request
    - 요청이 발생할때만 발생 하고 이후에은 GC에 의해 수집된다.
  - Transient
    - 새로운 전용 인스턴스를 받는다?

## Module..

<hr>

### 구조

- providers : Nest Inject의 의해 인스턴스화 되고, 모듈에서 사용하는 제공자
  - EX) Service, Repository ...
- controllers : ...
- imports : 다른 모듈에서 사용했던 애들을, 해당 모듈에서 사용할때 export 돼어있어야 함...
- exports : 우리 모듈에만 쓸게 아니라, 다른 모듈에서도 사용할 때 내보냄...

### Global Modules \*\*\*

- @Global()
- Helper, Database 연결같은 Provider, Repository들을 사용하려면 Global로 사용하자...

### 동적모듈 \*\*\*

- https://docs.nestjs.com/fundamentals/dynamic-modules (모르겠음...)
- 정적 모듈 바인딩
- exports -> imports 사용해서 정적으로 A 모듈에서 B 모듈을 사용가능 함

```ts
// user.module.ts
@Module({
  proviers: [UserService],
  exports: [UserService],
})
// auth.module.ts
@Module({
  imports: [UserModule],
  providers: [AuthService],
  exports: [AuthService],
})

// auth.service
export class AuthService {
  constructor(private readonly usersService: usersService) {}
}
```

## Middlewars...

### AppModule in Middleware

- global middleware

```ts
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'v1', method: RequestMethod.GET });
  }
}
```

- forRoutes in Specific Controller

```ts
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AppController);
  }
}
```

- Exclude Routes...

```ts
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'v1', method: RequestMethod.GET },
        { path: 'v1', method: RequestMethod.POST },
        'v1/(.*)',
      );
  }
}
```

- ...Rest Middleware

```ts
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors(), helmet(), LoggerMiddleware)
      .forRoutes({ path: 'v1', method: RequestMethod.GET });
  }
}
```

# NestJS: A Compilation of Different Things

NestJS is a progressive Node.js framework that is designed to build efficient and scalable server-side applications. It is built with TypeScript and uses modern JavaScript features, making it a powerful tool for building complex web applications.

This readme file is a compilation of different things that you can do with NestJS, including installation, basic usage, and some advanced topics.

## Note

This repo is mostly for anything nest JS - Nothing's really set up to run the entire nest JS APP

## Installation

To get started with NestJS, you first need to install it. You can install NestJS using either `npm` or `yarn`.

### Installing NestJS using npm

To install NestJS using npm, run the following command:

```npm install --save @nestjs/core @nestjs/common @nestjs/platform-express
```

### Installing NestJS using yarn

To install NestJS using yarn, run the following command:

```yarn add @nestjs/core @nestjs/common @nestjs/platform-express
```

## Basic Usage

Once you have installed NestJS, you can create a new project using the `nest new` command. This will create a new NestJS project with a basic directory structure and some example files.

```nest new my-app
```

### Creating a Controller

To create a controller in NestJS, you can use the `@Controller()` decorator. This decorator takes an optional parameter that specifies the path prefix for all the routes defined in the controller.

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
```

### Creating a Service

To create a service in NestJS, you can use the `@Injectable()` decorator. This decorator marks the class as a provider that can be injected into other classes.

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

### Injecting a Service into a Controller

To inject a service into a controller, you can use the `@Inject()` decorator in the constructor of the controller. This will automatically inject an instance of the service into the controller.

```typescript
import { Controller, Get } from '@nestjs/common';
import { HelloService } from './hello.service';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello(): string {
    return this.helloService.getHello();
  }
}
```

## Advanced Topics

### Authentication with Passport

NestJS provides built-in support for authentication with the popular Passport library. To use Passport with NestJS, you can install the `@nestjs/passport` and `passport` packages.

```npm install --save @nestjs/passport passport
```

Once installed, you can create a Passport strategy and use it in a controller.

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
```

```typescript
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
}```

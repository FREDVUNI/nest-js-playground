// app.ts - starting point,so store all the modules here ...

// user.module.ts - both provider & controller related to the module are shared here
import { Module } from '@nestjs/common';
import { userController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import {  User } from './entities/user.entity'

@Module({
    controllers:[userController],
    providers:[UserService],
    imports:[TypeOrmModule.forFeature([User])]
})

export class userModule{
    
}

//dto
import { IsString,IsNotEmpty,IsEmail } from 'class-validator';

@IsNotEmpty()
@IsString()
username:String

@IsNotEmpty()
@IsString()
@IsEmail()
email:String

@IsNotEmpty()
@IsString()
password:String

//entity
import { Entity,Column,PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:string

    @Column()
    email:string

    @Column()
    password:string
}

//provider/service --- user.service.ts
import { Injectable  } from '@nestjs/common'
import { User } from './entities/user.entity'
import { createDto,updateDto } from './dto/user.dto'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable({})

export class userService{
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}
    get():Promise<User[]>{
        return this.userRepository.find([])
    }
    create(dto:createDto){
        return this.userRepository.save(dto)
    }
    show(id:number){
        return this.userRepository.findOne({
            where:{
                id:id
            }
        })
    }
    update(dto:updateDto,id:number){
        return this.userRepository.update(id,dto)
    }
    delete(id:number){
        return this.userRepository.delete(id)
    }
}

//controller
import { controller,Get,Patch,Post,Delete,Param } from '@nestjs/common';
import {  UserService } from './user.service'
import { createDto,updateDto } from './dto/user.dto'

@controller({})
export class UserController{
    constructor(
        private userService:UserService
    ){}
    
    @Get()
    users(){
        return this.userService.get()
    }
    @Post()
    create_user(body:createDto){
        return this.userService.create(body)
    }
    @Get('/:id')
    show_user(@Param('id', ParseIntPipe) id:number){
        return this.userService.show(id)
    }
    @Patch('/:id')
    update_user(@Param('id',parseIntPipe) id:number,body:updateDto){
        return this.userService.update(id,body)
    }

    @Delete('/:id')
    delete_user(@Param('id', parseIntPipe) id:number){
        return this.userService.delete(id)
    }
}
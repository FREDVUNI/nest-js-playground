// tod list app nest js - typeorm mysql

// install dependencies
npm i --save @nestjs/typeorm typeorm mysql

//create ormconfig at the root of your dir
{
    type:"mysql",
    host:"localhost",
    port:3306,
    user:"root",
    password:" ",
    database:"nest-todo",
}

// entities/todo.entity.ts under todo - controller,entity,dto,module(put the exported module under app)

import {Column,PrimaryGeneratedColumn,Entity} from 'typeorm'

@Entity({})
export class Todo{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    item:string;

    @Column({ default:false })
    completed:boolean
}

// todo.module.ts
import { Module } from '@nestjs/common'
import { Todo } from './todo.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports:[ TypeOrmModule.forFeature([Todo]) ]
})
export class TodoModule{

}
// dtos
import {IsNotEmpty,IsString,IsBoolean,IsNumber}  from 'class-validator'

export class createDto{
    @IsNotEmpty()
    IsNumber()
    id:number;

    @IsNotEmpty()
    IsString()
    item:string;

    @IsNotEmpty()
    @IsBoolean()
    completed:boolean;
}

export class updateDto{
    IsNumber()
    id:number;

    IsString()
    item:string;

    @IsBoolean()
    completed:boolean;
}

// todo.service.ts
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Todo } from './todo.entity'
import { createDto,updateDto } from './dto/todo'

@Injectable({})
export class TodoService{
    constructor(
        @InjectRepository(Todo)
        private TodoRepository: Repository<Todo>
    ){}

    async findAll():Promise<Todo[]>{
        return this.TodoRepository.find();
    }
    async findOne(id:number):Promise<Todo>{
        return this.TodoRepository.findOne(id);
    }
    async create(body:createDto){
        return this.TodoRepository.save(body)
    }
    async update(id:number,body:updateDto){
        return this.TodoRepository.update(id,body)
    }
    async delete(id:number){
        return this.TodoRepository.delete(id)
    } 
}

// controller todo.controller.ts
import { Post,Get,Param,Delete,Patch,Controller } from '@nestjs/common'
import { createDto,updateDto } from './dto/todo'
import { TodoService } from './todo.service'
import { Todo } from './entities/todo'

@Controller()
export const TodoController{
    constructor (private todoService:TodoService){}

    @Get()
    async find(){
        return this.todoService.findAll()
    }

    @Get(":id")
    async findOne(id){
        return this.todoService.findOne(id)
    }

    @Post()
    save(dto:createDto){
        return this.todoService.create(dto)
    }

    @Patch(":id")
    update(id,dto:updateDto){
        return this.todoService.update(id,dto)
    }

    @Delete(":id")
    delete(id){
        return this.todoService.delete(id)
    }
}
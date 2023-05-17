// set up schema
// npx prisma init - to initialise prisma
// npx prisma generate to create the fields in the table

// categories - entities , dtos, module,controller and service/provider

//create.dto
import {IsString,IsNotEmpty,IsNumber} from 'class-validator';

@IsNotEmpty()
@IsNumber()
id:number;

@IsNotEmpty()
@IsString()
category:string;

//update.dto
import {IsString,IsNumber} from 'class-validator';

@IsNumber()
id:number;

@IsString()
category:string;

// entities
// create in the schema before migration - npx prisma migrate dev

// category.module

import { Module } from '@nestjs/common'
import {CategoryController} from './category.controller'
import {Categoryservice} from './category.service'

@module({
    controllers:[CategoryController],
    providers:[CategoryService]
})

export class CategoryModule{

}

// service/provider
import { Injectable,ForbiddenException } from '@nestjs/common'
import {prisma,Category} from '@prisma/client'
import { prismaService } from '@nestjs/prisma'
import { createDto  } from './dto/create.dto'
import { updateDto  } from './dto/update.dto'

@Injectable({

})

export class categoryService{
    constructor(private prisma:prismaService){

    }
    async create(dto:createDto){
        return this.prisma.Category.create(dto)
    }
    async fetch(){
        return this.prisma.Category.findMany()
    }
    async show(id:number){
        return this.prisma.Category.findUnique({
            where:{
                id
            }
        })
    }
    async update(id:number,dto:updateDto){
        const category = this.prisma.Category.findUnique({
            where:{
                id
            }
        })
        if (!category) throw new ForbiddenException("category was not found.")

        return this.prisma.Category.update(id,dto)

    }
    async delete(id:number){
        const category = this.prisma.Category.findUnique({
            where:{
                id
            }
        })
        if (!category) throw new ForbiddenException("category was not found.")

        return this.prisma.Category.delete(id)
    }
}

// controller

import { Controller,Post,Get,Patch,Delete,Param,ParseIntPipe,Body } from '@nestjs/common'
import { CategoryService } from './category.service'
import { createDto  } from './dto/create.dto'
import { updateDto  } from './dto/update.dto'

@Controller('category')

export class CategoryController{
    constructor (private categoryService:Categoryservice){}

    @Post()
    async createCategory(@Body() dto:createDto){
        return this.categoryService.create(dto)
    }

    @Get(':id')
    async showCategory(@Param('id',ParseIntPipe)  id:number){
        return this.categoryService.show(id)
    }

    @Get()
    async getCategories(){
        return this.categoryService.fetch()
    }

    @Patch()
    async updateCategory(@Param('id',ParseIntPipe) id:number,@Body() dto:updateDto){
        return this.categoryService.update(id,dto)
    }

    @Delete()
    async deleteCategory(@Param('id',ParseIntPipe) id:number){
        return this.categoryService.delete(id)
    }
}

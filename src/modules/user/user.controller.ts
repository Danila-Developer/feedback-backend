import {Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {AccessRolesGuard} from "./guards/access-roles.guard";
import {AccessRole} from "./decorators/access-role.decorator";
import {ValidationPipe} from "../../pipes/validation.pipe";
import {Request} from "express";

@Controller('/api/user')
export class UserController {
    constructor(private UserService: UserService) {}


    @Post('/login')
    login(@Body() userDto: LoginUserDto) {
        return this.UserService.login(userDto)
    }

    @UsePipes(ValidationPipe)
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        console.log(userDto)
        return this.UserService.registration(userDto)
    }

    @Get('/qq')
    @AccessRole(['ADMIN'])
    @UseGuards(AccessRolesGuard)
    qq(@Req() req: Request) {
        console.log(req['user'])
        return {da: 'da'}
    }
}
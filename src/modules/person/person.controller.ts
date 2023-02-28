import {
    Body,
    Controller, HttpCode,
    HttpStatus,
    Post,
    Req,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";

import {CreatePersonDto} from "./dto/create-person.dto";
import {PersonService} from "./person.service";
import {AccessRole} from "../user/decorators/access-role.decorator";
import {AccessRolesGuard} from "../user/guards/access-roles.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {Request} from "express";

@Controller('/api/person')
export class PersonController {
    constructor(private personService: PersonService) {}

    @Post('/create')
    @AccessRole(['USER', 'ADMIN'])
    @UseGuards(AccessRolesGuard)
    @UseInterceptors(FileInterceptor('media'))
    @HttpCode(HttpStatus.CREATED)
    async createPerson(@Body() dto: CreatePersonDto,
                       @UploadedFile() media,
                       @Req() request: Request) {
        return await this.personService.createPerson({...dto, userId: request['user'].id, media: media})
    }


}
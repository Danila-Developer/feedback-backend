import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Req,
    UploadedFile,
    UploadedFiles,
    UseGuards, UseInterceptors
} from "@nestjs/common";
import {FeedbackService} from "./feedback.service";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {Request} from "express";
import {AccessRole} from "../user/decorators/access-role.decorator";
import {AccessRolesGuard} from "../user/guards/access-roles.guard";
import {CreateFeedbackDto} from "./dto/create-feedback.dto";
import {FileFieldsInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {CreateFeedbackWithPersonDto} from "./dto/create-feedback-with-person.dto";

@Controller('/api/feedback')
export class FeedbackController {
    constructor(private FeedbackService: FeedbackService) {}

    @Post('/comment')
    @AccessRole(['USER', 'ADMIN'])
    @UseGuards(AccessRolesGuard)
    @HttpCode(HttpStatus.OK)
    async createComment(@Body() commentDto: CreateCommentDto, @Req() request: Request) {
        return await this.FeedbackService.createComment({...commentDto, userId: request['user'].id})
    }

    @Post('/')
    @AccessRole(['USER', 'ADMIN'])
    @UseGuards(AccessRolesGuard)
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FilesInterceptor('media'))
    async createFeedback(@Body() feedbackDto: CreateFeedbackDto,
                         @Req() request: Request,
                         @UploadedFiles() media) {
        return await this.FeedbackService.createFeedback({...feedbackDto, userId: request['user'].id, media: media})
    }

    @Post('/create-person/')
    @AccessRole(['USER', 'ADMIN'])
    @UseGuards(AccessRolesGuard)
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'personMedia', maxCount: 1},
        {name: 'feedbackMedia'}
    ]))
    async createFeedbackWithPerson(@Body() feedbackWithPersonDto: CreateFeedbackWithPersonDto,
                                   @UploadedFiles() media: {personMedia?: File, feedbackMedia?: File[]}) {

    }

    @Get(':personId')
    async getAllFeedbacksByPersonId(@Param('personId') personId: string) {
        return await this.FeedbackService.getAllFeedbacksByPersonId(personId)
    }


    @Get('/comment/:feedbackId')
    async getAllCommentsByFeedbackId(@Param('feedbackId') feedbackId: string) {
        return await this.FeedbackService.getAllCommentsByFeedbackId(feedbackId)
    }
}
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CommentModel} from "./models/comment.model";
import {v4 as generateUuid} from 'uuid'
import {FeedbackModel} from "./models/feedback.model";
import {CreateFeedbackDto} from "./dto/create-feedback.dto";
import {UserModel} from "../user/user.model";
import {FileService} from "../file/file.service";
import {MediaModel} from "./models/media.model";
import {CreatePersonDto} from "../person/dto/create-person.dto";
import {PersonService} from "../person/person.service";

@Injectable()
export class FeedbackService {
    constructor(@InjectModel(CommentModel) private commentRepository: typeof CommentModel,
                @InjectModel(FeedbackModel) private feedbackRepository: typeof FeedbackModel,
                @InjectModel(MediaModel) private mediaRepository: typeof MediaModel,
                private FileService: FileService,
                private PersonService: PersonService) {}

    async createComment(commentDto: CreateCommentDto) {
        try {
            return await this.commentRepository.create({...commentDto, id: generateUuid()})
        } catch (e) {
            throw new HttpException(`Ошибка при добавлении комментария`, HttpStatus.BAD_REQUEST)
        }
    }

    async createFeedback(feedbackDto: CreateFeedbackDto) {
        try {
            const id = generateUuid()
            const feedback = await this.feedbackRepository.create({...feedbackDto, id})
            this.uploadMedia(feedbackDto.media, id)
            return feedback
        } catch (e) {
            throw new HttpException(`Ошибка при добавлении отзыва`, HttpStatus.BAD_REQUEST)
        }
    }

    async createFeedbackWithPerson(feedbackDto: CreateFeedbackDto, personDto: CreatePersonDto) {
        try {
            const person = await this.PersonService.createPerson(personDto)
            const feedback = await this.createFeedback(feedbackDto)
            return feedback
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getAllFeedbacksByPersonId(personId: string) {
        return this.feedbackRepository.findAll({where: {personId},
            include: [
                { model: UserModel, attributes: ['firstName', 'lastName', 'avatarImageId'] },
                { model: CommentModel, attributes: ['body', 'createdAt'], include: [
                        { model: UserModel, attributes: ['firstName', 'lastName', 'avatarImageId'] }
                    ]
                }
              ]
        })
    }


    private uploadMedia(files: Array<any>, feedbackId: string) {
        Promise.all(files.map(file => this.FileService.uploadFile(file)))
            .then(fileIds =>{
                fileIds.forEach(fileId => {
                    this.mediaRepository.create({id: generateUuid(), feedbackId, fileId})
                })
            })
    }

    async getAllCommentsByFeedbackId(feedbackId: string) {
        return this.commentRepository.findAll({where: {feedbackId}, include: [
                { model: UserModel, attributes: ['firstName', 'lastName', 'avatarImageId'], }]})
    }
}
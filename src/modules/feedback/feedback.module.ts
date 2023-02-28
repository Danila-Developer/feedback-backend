import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {FeedbackModel} from "./models/feedback.model";
import {FeedbackController} from "./feedback.controller";
import {FeedbackService} from "./feedback.service";
import {CommentModel} from "./models/comment.model";
import {MediaModel} from "./models/media.model";
import {UserModule} from "../user/user.module";
import {FileModule} from "../file/file.module";
import {PersonModule} from "../person/person.module";

@Module({
    controllers: [FeedbackController],
    providers: [FeedbackService],
    imports: [
        SequelizeModule.forFeature([CommentModel, FeedbackModel, MediaModel]),
        UserModule,
        FileModule,
        PersonModule
    ]
})
export class FeedbackModule {}
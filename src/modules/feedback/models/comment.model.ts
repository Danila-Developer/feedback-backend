import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {UserModel} from "../../user/user.model";
import {FeedbackModel} from "./feedback.model";

interface CommentCreationAttr {
    id: string;
    body: string;
    feedbackId: string;
}

@Table({tableName: 'feedback_comment', updatedAt: false})
export class CommentModel extends Model<CommentModel, CommentCreationAttr> {

    @Column({type: DataType.STRING, unique: true, primaryKey: true})
    id: string;

    @Column({type: DataType.STRING, allowNull: false})
    body: string;

    @ForeignKey(() => FeedbackModel)
    @Column({type: DataType.STRING, allowNull: false})
    feedbackId: string;

    @ForeignKey(() => UserModel)
    @Column({type: DataType.STRING, allowNull: false})
    userId: string;

    @BelongsTo(() => UserModel)
    user: UserModel;

    @BelongsTo(() => FeedbackModel)
    feedback: FeedbackModel
}
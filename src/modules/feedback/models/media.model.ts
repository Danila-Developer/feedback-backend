import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {FeedbackModel} from "./feedback.model";
import {FileModel} from "../../file/file.model";

interface MediaCreationAttr {
    id: string;
    fileId: string;
    feedbackId: string;
}

@Table({tableName: 'feedback_media', updatedAt: false})
export class MediaModel extends Model<MediaModel, MediaCreationAttr> {

    @Column({type: DataType.STRING, primaryKey: true, unique: true})
    id: string;

    @ForeignKey(() => FileModel)
    @Column({type: DataType.STRING, allowNull: true})
    fileId: string;

    @Column({type: DataType.STRING})
    @ForeignKey(() => FeedbackModel)
    feedbackId: string;

    @BelongsTo(() => FeedbackModel)
    feedback: FeedbackModel;

    @BelongsTo(() => FileModel)
    file: FileModel;

}
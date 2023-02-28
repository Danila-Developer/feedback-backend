import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {UserModel} from "../../user/user.model";
import {MediaModel} from "./media.model";
import {CommentModel} from "./comment.model";
import {PersonModel} from "../../person/models/person.model";

interface FeedbackCreationAttr {
    id: string;
    rating: string;
    body: string;
    userId: string;
}

@Table({tableName: 'feedback', updatedAt: false})
export class FeedbackModel extends Model<FeedbackModel, FeedbackCreationAttr> {
    @Column({type: DataType.STRING, primaryKey: true, unique: true})
    id: string;

    @Column({type: DataType.INTEGER})
    rating: number;

    @Column({type: DataType.STRING})
    body: string;

    @ForeignKey(() => PersonModel)
    @Column({type: DataType.STRING})
    personId: string;

    @Column({type: DataType.STRING})
    @ForeignKey(() => UserModel)
    userId: string;

    @BelongsTo(() => UserModel)
    user: UserModel;

    @HasMany(() => MediaModel)
    media: MediaModel[];

    @HasMany(() => CommentModel)
    comments: CommentModel[];

    @BelongsTo(() => PersonModel)
    person: PersonModel;
}



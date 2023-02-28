import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {FileModel} from "../../file/file.model";
import {SpecializationModel} from "./specialization.model";
import {UserModel} from "../../user/user.model";
import {FeedbackModel} from "../../feedback/models/feedback.model";

interface PersonCreationAttr {
    readonly id: string;
    readonly name: string;
    readonly address: string;
    readonly site: string;
    readonly phone: string;
    readonly about: string;
    readonly avatarId: string;
    readonly specializationId: string;
}

@Table({tableName: 'person', updatedAt: false})
export class PersonModel extends Model<PersonModel, PersonCreationAttr> {

    @Column({unique: true, primaryKey: true, type: DataType.STRING})
    id: string;

    @Column({type: DataType.STRING})
    name: string;

    @Column({type: DataType.STRING})
    address: string;

    @Column({type: DataType.STRING})
    site: string;

    @Column({type: DataType.STRING})
    phone: string;

    @Column({type: DataType.STRING})
    about: string;

    @ForeignKey(() => FileModel)
    @Column({type: DataType.STRING})
    avatarId: string;

    @ForeignKey(() => SpecializationModel)
    @Column({type: DataType.STRING})
    specializationId: string;

    @ForeignKey(() => UserModel)
    @Column({type: DataType.STRING})
    userId: string;

    @BelongsTo(() => FileModel)
    avatar: FileModel;

    @BelongsTo(() => SpecializationModel)
    specialization: SpecializationModel

    @BelongsTo(() => UserModel)
    user: UserModel;

    @HasMany(() => FeedbackModel)
    feedbacks: FeedbackModel[];

}
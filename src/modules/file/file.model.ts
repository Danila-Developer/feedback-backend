import {Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {MediaModel} from "../feedback/models/media.model";
import {UserModel} from "../user/user.model";
import {PersonModel} from "../person/models/person.model";

interface FileCreationAttr {
    readonly id: string;
    readonly name: string;
    readonly filePath: string;
    readonly previewPath: string;
    readonly size: string;
    readonly type: string;
}

@Table({tableName: 'file', updatedAt: false})
export class FileModel extends Model<FileModel, FileCreationAttr> {
    @Column({type: DataType.STRING, primaryKey: true, unique: true})
    id: string;

    @Column({type: DataType.STRING})
    name: string;

    @Column({type: DataType.STRING})
    filePath: string;

    @Column({type: DataType.STRING})
    previewPath: string;

    @Column({type: DataType.STRING})
    size: string;

    @Column({type: DataType.STRING})
    type: string;

    @HasMany(() => MediaModel)
    feedbackMedias: MediaModel[]

    @HasMany(() => UserModel)
    userAvatars: UserModel[]

    @HasMany(() => PersonModel)
    person: PersonModel[]
}
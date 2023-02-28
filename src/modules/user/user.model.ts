import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {CommentModel} from "../feedback/models/comment.model";
import {FileModel} from "../file/file.model";
import {PersonModel} from "../person/models/person.model";



interface CreateUserRoleAttr {
    name: string;
}

@Table({tableName: 'user_role', updatedAt: false, createdAt: false})
export class UserRoleModel extends Model<UserRoleModel, CreateUserRoleAttr> {

    @Column({type: DataType.STRING, primaryKey: true, allowNull: false, unique: true})
    id: string;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    value: string;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string;

    @HasMany(() => UserModel)
    users: UserModel[]
}

interface CreateUserAttr {
    id: string;
    email: string;
    password: string;
    roleId: string;
}

@Table({tableName: 'user', updatedAt: false})
export class UserModel extends Model<UserModel, CreateUserAttr> {

    @Column({type: DataType.STRING, primaryKey: true, unique: true})
    id: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    firstName: string;

    @Column({type: DataType.STRING, allowNull: false})
    lastName: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    password: string;

    // @Column({type: DataType.BOOLEAN, defaultValue: false})
    // isBan: boolean;

    @ForeignKey(() => FileModel)
    @Column({type: DataType.STRING, allowNull: true, defaultValue: null})
    avatarImageId: string;

    @ForeignKey(() => UserRoleModel)
    @Column({type: DataType.STRING})
    roleId: string;

    @BelongsTo(() => UserRoleModel)
    role: UserRoleModel

    @BelongsTo(() => FileModel)
    avatar: FileModel

    @HasMany(() => CommentModel)
    comments: CommentModel[]

    @HasMany(() => PersonModel)
    persons: PersonModel[]
}




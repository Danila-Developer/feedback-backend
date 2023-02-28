import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {PersonModel} from "./person.model";


interface SpecializationCreationAttr {
    readonly id: string;
    readonly name: string;
}

@Table({tableName: 'person_specialization', createdAt: false, updatedAt: false})
export class SpecializationModel extends Model<SpecializationModel, SpecializationCreationAttr> {

    @Column({primaryKey: true, unique: true, type: DataType.STRING})
    id: string;

    @Column({unique: true, type: DataType.STRING})
    name: string;

    @HasMany(() => PersonModel)
    persons: PersonModel[]
}
import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {PersonModel} from "./models/person.model";
import {PersonController} from "./person.controller";
import {PersonService} from "./person.service";
import {SpecializationModel} from "./models/specialization.model";
import {FileService} from "../file/file.service";
import {FileModule} from "../file/file.module";
import {UserModule} from "../user/user.module";

@Module({
    imports: [
        SequelizeModule.forFeature([PersonModel, SpecializationModel]),
        FileModule,
        UserModule
    ],
    controllers: [PersonController],
    providers: [PersonService],
    exports: [PersonService]
})
export class PersonModule {}
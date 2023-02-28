import {Module} from "@nestjs/common";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel, UserRoleModel} from "./user.model";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [
        SequelizeModule.forFeature([UserModel, UserRoleModel]),
        JwtModule.register({
            secretOrPrivateKey: process.env.JWT_PRIVATE_KEY || 's',
            signOptions: {
                expiresIn: '24h'
            }
        })
    ],
    exports: [UserService, JwtModule]
})
export class UserModule {}
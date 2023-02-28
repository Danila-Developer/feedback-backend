import { NestFactory } from '@nestjs/core';
import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {resolve} from 'path'


import {UserModel, UserRoleModel} from "./modules/user/user.model";
import {UserModule} from "./modules/user/user.module";
import {FeedbackModule} from "./modules/feedback/feedback.module";
import {MediaModel} from "./modules/feedback/models/media.model";
import {CommentModel} from "./modules/feedback/models/comment.model";
import {FeedbackModel} from "./modules/feedback/models/feedback.model";
import {FileModel} from "./modules/file/file.model";
import {ServeStaticModule} from "@nestjs/serve-static";
import {PersonModel} from "./modules/person/models/person.model";
import {SpecializationModel} from "./modules/person/models/specialization.model";
import {PersonModule} from "./modules/person/person.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [
          CommentModel,
          UserModel,
          UserRoleModel,
          FeedbackModel,
          MediaModel,
          FileModel,
          PersonModel,
          SpecializationModel
      ],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
        rootPath: resolve(__dirname, 'static'),
        serveRoot: '/api/static'
    }),
    UserModule,
    FeedbackModule,
    PersonModule
  ]
})
class AppModule {}

async function bootstrap() {
  const PORT = process.env.PORT || 5002;
  const app = await NestFactory.create(AppModule, {cors: true});
  await app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  });
}

bootstrap();

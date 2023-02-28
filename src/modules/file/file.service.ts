import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import * as fs from 'fs'
import * as path from 'path'
import {InjectModel} from "@nestjs/sequelize";
import {FileModel} from "./file.model";
import * as uuid from 'uuid';

enum Months {
    january,
    february,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december
}

@Injectable()
export class FileService {
    constructor(@InjectModel(FileModel) private FileRepository: typeof FileModel) {}

    async uploadFile(file): Promise<string> {
        try {
            const id = uuid.v4()
            const fileName = `${id}-${file.originalname}`

            const datePath = `${Months[(new Date).getMonth()]}-${(new Date).getFullYear()}/${(new Date).getDate()}`
            const directoryPath = path.resolve(__dirname, '../..', 'static', datePath)
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, {recursive: true})
            }

            const filePath = path.resolve(directoryPath, fileName);
            const fileType = file.originalname.split('.').pop()

            return new Promise(resolve => {
                fs.writeFile(filePath, file.buffer, err => {
                    if (err) throw new HttpException('Ошибка при загрузке файла', HttpStatus.INTERNAL_SERVER_ERROR)
                    this.FileRepository.create({
                        id,
                        name: file.originalname,
                        filePath: `/api/static/${datePath}/${fileName}`,
                        size: file.size,
                        type: fileType
                    })
                    resolve(id)
                })
            })
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

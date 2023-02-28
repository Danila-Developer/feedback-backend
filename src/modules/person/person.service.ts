import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {PersonModel} from "./models/person.model";
import {CreatePersonDto} from "./dto/create-person.dto";
import {v4 as generateUUID} from 'uuid'
import {SpecializationModel} from "./models/specialization.model";
import {FileService} from "../file/file.service";

@Injectable()
export class PersonService {
    constructor(@InjectModel(PersonModel) private personRepository: typeof PersonModel,
                @InjectModel(SpecializationModel) private specializationRepository: typeof SpecializationModel,
                private fileService: FileService) {}

    async createPerson(dto: CreatePersonDto) {
        try {
            const specialization = await this.findOrCreateSpecialization(dto.specialization)
            let avatarId = null
            if (dto.media) avatarId = await this.fileService.uploadFile(dto.media)
            return await this.personRepository.create({...dto, id: generateUUID(), specializationId: specialization.id, avatarId})
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    private async findOrCreateSpecialization(name: string): Promise<SpecializationModel> {
        //console.log(name)
        let specialization = await this.specializationRepository.findOne({where: {name}})
        if (!specialization) specialization = await this.specializationRepository.create({id: generateUUID(), name})
        return specialization
    }
}
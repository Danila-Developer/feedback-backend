import {Body, HttpException, HttpStatus, Injectable, Post} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {UserModel, UserRoleModel} from "./user.model";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {v4 as generateUuidV4} from 'uuid'
import {CreateUserDto} from './dto/create-user.dto'
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private userRepository: typeof UserModel,
                @InjectModel(UserRoleModel) private userRoleRepository: typeof UserRoleModel,
                private jwtService: JwtService) {}


    async login(userDto: LoginUserDto) {
        const user = await this.validateUser(userDto)
        const token = await this.generateUserToken(user)
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            token
        }
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.getUserByEmail(userDto.email)
        if (candidate) throw new HttpException('Пользователь с таким email уже зарегистрирован',
            HttpStatus.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(String(userDto.password), 5)
        const user = await this.createUser({...userDto, password: hashPassword})
        const token = this.generateUserToken(user)
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            token: token
        }
    }

    private async createUser(userDto: CreateUserDto) {
        const role = await this.userRoleRepository.findOne({where: {value: 'USER'}})
        const user = await this.userRepository.create({...userDto, id: generateUuidV4(), roleId: role.id})
        user.role = role
        return user
    }

    private async getUserByEmail(email: string): Promise<UserModel> {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user;
    }

    private generateUserToken(user: UserModel) {
        const payload = {email: user.email, role: user.role, id: user.id};
        return this.jwtService.sign(payload)

    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.getUserByEmail(userDto.email)
        if (!user) throw new HttpException('Пользователя с таким email не существует', HttpStatus.BAD_REQUEST)

        const isEqualPasswords = await bcrypt.compare(userDto.password, user.password)
        if (isEqualPasswords) return user
        else throw new HttpException('Введен неверный пароль', HttpStatus.BAD_REQUEST)

    }
}
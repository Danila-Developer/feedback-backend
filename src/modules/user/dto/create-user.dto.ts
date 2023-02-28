import {IsEmail, IsNotEmpty, Length} from "class-validator";

export class CreateUserDto {
    id: string;

    @IsEmail({}, {message: 'Некоррекный email'})
    @IsNotEmpty({message: 'Введите email'})
    readonly email: string;

    @IsNotEmpty({message: 'Введите пароль'})
    @Length(6, 16, {message: 'Пароль должен содержать от 6 до 16 символов'})
    readonly password: string;

    @IsNotEmpty({message: 'Введите ваше имя'})
    readonly firstName: string;

    @IsNotEmpty({message: 'Введите вашу фамилию'})
    readonly lastName: string;
}
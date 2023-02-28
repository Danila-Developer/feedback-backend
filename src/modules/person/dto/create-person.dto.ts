export class CreatePersonDto {
    readonly name: string;
    readonly specialization: string;
    readonly address: string;
    readonly site: string;
    readonly phone: string;
    readonly about: string;
    readonly userId: string;
    readonly media: File;
}
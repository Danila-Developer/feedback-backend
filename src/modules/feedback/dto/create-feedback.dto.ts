export class CreateFeedbackDto {
    readonly body: string;
    readonly rating: string;
    readonly userId: string;
    readonly personId: string;
    readonly media: File[]
}
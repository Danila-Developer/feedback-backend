import {CreatePersonDto} from "../../person/dto/create-person.dto";
import {CreateFeedbackDto} from "./create-feedback.dto";

export class CreateFeedbackWithPersonDto {
    readonly person: CreatePersonDto;
    readonly feedback: CreateFeedbackDto;
}
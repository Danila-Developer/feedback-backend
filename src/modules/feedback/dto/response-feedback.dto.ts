interface User {
    id: string;
    userName: string;
    userImage: string;
}

interface Media {
    id: string;
    path: string;
}

interface Comment {
    id: string;
    user: User;
    cratedAt: Date;
    commentBody: string;
}

export class FeedbackResponseDto {
    readonly id: string;
    user: User;
    createdAt: Date;
    rating: number;
    feedbackBody: string;
    media: Media[];
    comments: Comment[];
}

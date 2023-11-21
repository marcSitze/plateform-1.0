export default interface IMedia {
    _id?: string;
    name: string;
    author: string;
    photo: {
			data: Buffer;
			contentType: String;
    }
    // path: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
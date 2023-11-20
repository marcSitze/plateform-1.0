import IMedia from './media.interface';
import { CreateMediaDTO } from '../../dto/media.dto';

export interface IMediaService{
    createMedia(user: CreateMediaDTO): Promise<IMedia | void>;
    getMedias(): Promise<IMedia[] | void>;
    findOne(query: any): Promise<IMedia | void | any>;
    getMediaById(id: string): Promise<IMedia | void | any>;
}
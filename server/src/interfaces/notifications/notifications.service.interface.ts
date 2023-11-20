import INotification from './notification.interface';
import { CreateNotifDTO } from '../../dto/notification.dto';

export interface INotificationsService {
    createNotification(tag: CreateNotifDTO): Promise<INotification | void>;
    getNotifications(query: any): Promise<INotification[] | void>;
    // findOne(query: any): Promise<INotification | void | any>;
    updateNotification(id: string, query: any): Promise<INotification | void | any>;
}
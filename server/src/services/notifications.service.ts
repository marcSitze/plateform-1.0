import Notification from "../models/Notification";
import { INotificationsService } from "../interfaces/notifications/notifications.service.interface";
import { CreateNotifDTO } from "../dto/notification.dto";

export default class notificationsService implements INotificationsService {
  constructor() {}
  createNotification = async (notif: CreateNotifDTO) => {
    const newNotif = new Notification(notif);
    return await newNotif.save();
  };
  getNotifications = async (query: any) => {
    return await Notification.find(query).sort({ createdAt: -1})
  };
  updateNotification = async (id: string, query: any) => {
    return await Notification.findOneAndUpdate({ _id: id }, query, { new: true })
  };
}

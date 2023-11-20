import { CreateNotifDTO } from "../../dto/notification.dto"
import NotificationsService from '../../services/notifications.service'

const notificationsService = new NotificationsService()

export const createNotification = async (socket: any) => {
  console.log('Notification function...')
  console.log('socketObj: ', socket)
  // try {
  //   const newNotif = await notificationsService.createNotification(notif)
  //   return newNotif
  // } catch (err) {
  //   console.error('ErrCreatingNotif: ', err)
  // }
}
import { Request, Response } from "express";

import { SuccessHandler, ErrorHandler } from "../common/response.handler";

import constants from "../common/constants";
import { CreateNotifDTO } from "../dto/notification.dto"
import NotificationsService from '../services/notifications.service'

const { httpStatus } = constants;
const notificationsService = new NotificationsService()

export const createNotification = (req: Request, res: Response) => {
  const { author, type, message  }: CreateNotifDTO = req.body

  SuccessHandler(res, httpStatus.OK, { msg: true})
}

export const getNotifications = async (req: Request, res: Response) => {
  const query: Partial<CreateNotifDTO> = req.query
  const notifications = notificationsService.getNotifications(query)
  SuccessHandler(res, httpStatus.OK, { notifications })
}
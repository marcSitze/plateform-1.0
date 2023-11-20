import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import { ErrorHandler, SuccessHandler } from '../common/response.handler';
import constants from '../common/constants';
import { createMedia as saveMedia } from '../common/upload';
import MediaService from '../services/media.service';

const { httpStatus } = constants;
const mediaService = new MediaService();

export const createMedia = async (req: any, res: any) => {

  // author here represents the userID
  const { name, author } = req.body;
  const errors = [];
console.log('req.body: ', req.body)
  if(!author) {
    errors.push({"msg": "An author needs to be passed in order to create a media"});
  }

  if(errors.length > 0) {
    console.log('errors: ', errors)
    return ErrorHandler(res, httpStatus.BAD_REQUEST, { "msg": "please enter valid informations", errors});
  }

  console.log('req.media: ', req.file);
  if(req.file && req.file.size > 10 * 1024 * 1024) {
    fs.unlink(req.file.path, function(err) {
      if(err) throw err;
    });
    errors.push({ "msg": "please upload an image or gif <= 10mo" });
    return ErrorHandler(res, httpStatus.BAD_REQUEST, { "msg": "please upload an image or gif <= 10mo", errors });
  }
  try {
    console.log('file path: ', req.file.path)
    const result = await saveMedia({
      name,
      path: req.file.path,
      mimetype: req.file.mimetype
    }, author);
    console.log('result: ', result);
    SuccessHandler(res, httpStatus.CREATED, result);
  } catch(err) {
    console.error(err);
  }


}
export const getMedia = async (req: any, res: Response) => {
  const media = await mediaService.getMediaById(req.params.id);
  if(media) {
  req.media = media;
  console.log('media', media);
  res.set('Content-Type', media.photo.contentType)
  res.send(media.photo.data);
  }
}

export const photo = (req: any, res: any, next: NextFunction) => {
  console.log('req.photo: ', req.photo);
  if(req.photo.photo.data) {
    res.set('Content-Type', req.photo.photo.contentType);
    res.send(req.photo.photo.data);
  }
  next();
}
export const getMedias = async (req: Request, res: Response) => {
  const medias = await mediaService.getMedias();
  
  try {
    return SuccessHandler(res, httpStatus.OK, medias);
  } catch (err) {
    console.error(err);
  }
}
export const updateMedia = async (req: Request, res: Response) => {}
import Media from '../models/Media';
import { IMediaService } from '../interfaces/media/media.service.interface';
import { CreateMediaDTO } from '../dto/media.dto';

export default class MediaService implements IMediaService {
  constructor() {}
  createMedia = async (media: CreateMediaDTO) => {
    const newMedia = new Media(media);
    return await newMedia.save();
  };
  getMedias = async () => {
    return await Media.find({}).sort({ createdAt: -1}).select('-photo');
  };
  findOne = async (query: Partial<CreateMediaDTO>) => {
    console.log('query: ', query);
    return await Media.findOne(query).populate("user", { password: 0, __v: 0 });
  };
  getMediaById = async (id: string) => {
    return await Media.findById(id).populate('user').select('-password');
  };
  // findMediaByQuery: async (query) => {
  //   return await Media.find(query).populate('user').select('-password');
  // },

  updateMedia = async (id: string, query: Partial<CreateMediaDTO>) => {
    return await Media.findOneAndUpdate({ _id: id }, query);
  }
}
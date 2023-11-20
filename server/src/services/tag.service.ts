import Tag from "../models/Tag";
import { ITagsService } from "../interfaces/tags/tags.service.interface";
import { CreateTagDTO } from "../dto/tag.dto";

export default class TagsService implements ITagsService {
  constructor() {}
  createTag = async (tag: CreateTagDTO) => {
    const newTag = new Tag(tag);
    return await newTag.save();
  };
  getTags = async (query: any) => {
    return await Tag.find(query).sort({ createdAt: -1})
  };
  findOne = async (query: any) => {
    console.log("query: ", query);
    return await Tag.findOne(query);
  };
  updateTag = async (id: string, query: any) => {
    return await Tag.findOneAndUpdate({ _id: id }, query, { new: true })
  };
}

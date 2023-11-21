import ITag from "./tags.interface";
import { CreateTagDTO } from "../tag.dto";

export interface ITagsService {
  createTag(tag: CreateTagDTO): Promise<ITag | void>;
  getTags(query: any): Promise<ITag[] | void>;
  findOne(query: any): Promise<ITag | void | any>;
  updateTag(id: string, query: any): Promise<ITag | void | any>;
}

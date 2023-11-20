import { Request, Response } from "express";

import { SuccessHandler, ErrorHandler } from "../common/response.handler";

import constants from "../common/constants";
import { CreateTagDTO } from "../dto/tag.dto"
import TagsService from '../services/tag.service'

const { httpStatus } = constants;
const tagsService = new TagsService()

export const createTag = async (req: Request, res: Response) => {

  const { author, tag }: CreateTagDTO = req.body
  const errors = [];

  if(!tag) {
    errors.push({ "msg": "Please enter a tag name" })
  }
  if(!author) {
    errors.push({ "msg": "An author is required to create a tag" })
  }

  if(errors.length > 0) {
    return ErrorHandler(res, httpStatus.BAD_REQUEST, errors)
  }

  tag.split(',').forEach(async (item) => {
    const hashTag = await tagsService.findOne({ tag: new RegExp(item.trim(), "gi") })

    if(hashTag) {
      const exists = hashTag.variants.find(variant => variant === item.trim())
      if(!exists) {
        const updateObj = {
          variants: [...hashTag.variants, item.trim()],
          count: hashTag.count + 1
        }
        await tagsService.updateTag(hashTag._id, updateObj)
      }
    }else{
      let variants = []
      variants.push(item.trim())
      await tagsService.createTag({author, tag: item.trim(), variants})
    }

  })
  SuccessHandler(res, httpStatus.OK, {
    msg: "Hashtag processed successfully..."
  })
};

export const getTags = async (req: Request, res: Response) => {
  const tags = await tagsService.getTags({})
  SuccessHandler(res, httpStatus.OK, { tags });
};

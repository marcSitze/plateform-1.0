import adaptRequest, { AdaptRequest } from "../common/adapt-request";
import handlePostsRequest from './posts.handler';

export default function postsController(req: AdaptRequest, res: any) {
  const httpRequest = adaptRequest(req);
  handlePostsRequest(httpRequest)
    .then((data) => {
      console.log('data: ', data);
      res.status(data?.statusCode).json(data)
    })
    .catch(e => {
      console.error('PostsContrErr: ', e);
      res.status(500).end();
    })
}
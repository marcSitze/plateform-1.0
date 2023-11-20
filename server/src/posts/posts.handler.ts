import makeDb from "../db";
import makePostsRepository from "./posts.repository";
import makePostsEndpointHandler from './posts.endpoint';

const database = makeDb('Post');
const postsRepository = makePostsRepository({ database });
// Inject account Service here
const postsEndpointHandler = makePostsEndpointHandler({ postsRepository });

export default postsEndpointHandler;
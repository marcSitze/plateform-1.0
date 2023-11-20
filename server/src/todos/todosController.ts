import adaptRequest from '../common/adapt-request';
import handleTodosRequest from './todos.handler';

export default function todosController(req: any, res: any) {
  const httpRequest = adaptRequest(req);
  console.log('httpRequest: ', httpRequest)
  handleTodosRequest(httpRequest)
    .then((data: any) => {
      console.log('Controller: ', { data})
      res
        // .set(headers)
        // .status(statusCode)
        .send(data)
    })
    .catch(e => {
      console.error('ContErr: ', e);
      res.status(500).end()
    })
}
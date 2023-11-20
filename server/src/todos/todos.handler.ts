import makeDb from '../db'
import makeTodosRepository from './todos.repository';
import makeTodosEndpointHandler from './todos.endpoint';

const database = makeDb('Todo');
const todosRepository = makeTodosRepository({database});
const todosEndpointHandler = makeTodosEndpointHandler({todosRepository});

export default todosEndpointHandler

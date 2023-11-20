import makeTodo from "./todo.entity";

export default function makeTodosEndpointHandler({ todosRepository }: any) {
  return async function handle(httpRequest: any) {
    switch (httpRequest.method) {
      case "POST":
        console.log('Post called')
        return createTodoService(httpRequest);

      case "GET":
        console.log('get service');
        return getTodosService(httpRequest);
      default:
        throw new Error("Unhandled http request");
    }
  };

  async function createTodoService(httpRequest: any) {
    const todoInfo = httpRequest.body;
    console.log('httpRequestService: ', httpRequest);
    if (!todoInfo) {
      throw new Error("enter valid informations");
    }

    try {
      console.log('TodoInfo: ', todoInfo)
      const todo = makeTodo(todoInfo);
      const result = await todosRepository.add(todo);
      console.log('result01: ', result);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        data: result,
      };
    } catch (error) {
      throw new Error("Unable to create todo, service");
    }
  }

  async function getTodosService(httpRequest: any) {
    try {
      const todos = await todosRepository.getTodos();
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 200,
        data: todos,
      };
    } catch (error) {
      throw new Error("Unable to get todo, service");
    }
  }
}

export default function makeTodo(todoInfo: { message: string; done: boolean }) {
  return Object.freeze({
    message: todoInfo.message,
    done: todoInfo.done,
  });
}

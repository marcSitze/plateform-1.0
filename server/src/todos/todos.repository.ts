import mongoose from "mongoose";
import makeTodo from "./todo.entity";
import Todo from '../models/Todo';

export default function makeTodosRepository ({ database }: any) {
  return Object.freeze({
    add,
    getTodos,
    remove,
  });

  async function add (todo: any) {
    const db = await database;
    console.log('todoRepo: ', todo);
    console.log('database: ', database);
    console.log('database: ', db);
    try {
      const newTodo = await db.create(makeTodo(todo));
      const result = await newTodo.save(todo);

      return {
        success: true,
        created: result,
      }

    }catch(err) {
      console.error('RepoErr: ', err);
      throw Error('RepoErr');
    }
  }

  async function getTodos() {
    const db = await database;
    const result = await db.find({});
console.log('result: ', result);
    return {
      success: true,
      todos: result,
    }
  }
  async function remove () {}
}
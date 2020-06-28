import {Todo} from "./Todo";

export class Project{
  id: number;
  name: string;
  todos: Todo[];

  constructor(id: number, name: string, todos: Todo[]) {
    this.id = id;
    this.name = name;
    this.todos=todos;
  }

  public getName(){
    return this.name;
  }
}

export class Todo{
  id: number;
  project_id: number;
  text: string;
  isCompleted: boolean;

  constructor(id: number, project_id: number, text: string, isCompleted: boolean) {
    this.id=id;
    this.project_id=project_id;
    this.text=text;
    this.isCompleted=isCompleted;
  }
}

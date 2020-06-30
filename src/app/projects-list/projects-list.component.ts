import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Project} from "../Project";
import {plainToClass} from "class-transformer";
import {Todo} from "../Todo";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects : Array<Project>;
  range : number;
  project :  Project;
  current : number;

  addTodo : FormGroup = new FormGroup({
    "text" : new FormControl(),
    "name" : new FormControl()
  })

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.current = -1;
    this.projects=[];
    this.http.get<Project[]>('https://aqueous-scrubland-05247.herokuapp.com/project/')
      .subscribe(data => {
        this.range=data.length;
        for (let x=0; x<data.length; x++){
          this.project = plainToClass(Project, data[x]);
          this.project.todos = [];
          for (let i=0; i<data[x].todos.length; i++) {
            this.project.todos.push(plainToClass(Todo, data[x].todos[i]))
          }
          let p = plainToClass(Project,this.project);
          this.projects.push(p);
          console.log(p)
        }
    })
  }

  public patchProject(id: number, project_id: number){
    let url = 'https://aqueous-scrubland-05247.herokuapp.com/projects/'+project_id+'/todo/'+id;
    console.log(url);
    this.http.patch(url,{}).subscribe();
    let todo = this.searchTodo(id, project_id);
    todo.isCompleted = !todo.isCompleted;
  }

  public searchTodo(id: number, project_id: number){
    for (let i=0; i<this.projects.length; i++){
      if (this.projects[i].id==project_id){
        for (let j=0; j<this.projects[i].todos.length; j++){
          if (this.projects[i].todos[j].id==id){
            return this.projects[i].todos[j];
          }
        }
      }
    }
  }

  public popup(int: number){
    this.current=int;
  }

  public postTodo(){
    let text = (document.getElementsByName('text').item(0) as HTMLInputElement).value;
    let lastTodoId = 0;
    let lastProjectId = 0;
    for (let i=0; i<this.projects.length;i++){
      if (this.projects[i].id>lastProjectId){
        lastProjectId = this.projects[i].id;
      }
      for (let j=0; j<this.projects[i].todos.length;j++){
        if (this.projects[i].todos[j].id>lastTodoId){
          lastTodoId=this.projects[i].todos[j].id;
        }
      }
    }
    lastTodoId++;
    lastProjectId++;
    let url = 'https://aqueous-scrubland-05247.herokuapp.com/todo';
    if (this.current==0){
      let name = (document.getElementsByName("name").item(0) as HTMLInputElement).value;
      let newTodo = new Todo(lastTodoId, lastProjectId, text, false);
      let newProject = new Project(lastProjectId, name,[]);
      newProject.todos.push(newTodo);
      this.projects.push(newProject);
      const body = {
        id: lastTodoId,
        project_id: lastProjectId,
        text: text,
        isCompleted: false,
        name: name
      }
      this.http.post(url,body).subscribe();
    } else {
      let todo = new Todo(lastTodoId, this.current, text, false);
      this.projects[this.current-1].todos.push(todo);
      console.log(this.projects);
      this.http.post(url,todo).subscribe();
    }
    this.current=-1;
    this.addTodo.reset();
  }


}

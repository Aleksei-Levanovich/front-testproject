import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Project} from "../Project";
import {plainToClass} from "class-transformer";
import {Todo} from "../Todo";


@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

  projects : Array<Project>;
  range : number;
  project :  Project;
  todos : Todo[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
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
  }


}

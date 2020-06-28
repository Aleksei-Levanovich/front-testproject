import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Project} from "../Project";

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  projects : Project[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Project[]>('https://aqueous-scrubland-05247.herokuapp.com/project/');
  }

}

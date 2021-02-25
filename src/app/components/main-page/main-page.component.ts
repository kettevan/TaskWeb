import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private service: Service) { }

  taskList

  ngOnInit(): void {
    this.service.getAllTasks().subscribe({
      next: result => this.taskList = result,
      error: err => console.log(console.error())
    })
  }

}

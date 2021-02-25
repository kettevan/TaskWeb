import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreateTaskModel } from 'src/app/Models/Models';
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  form: FormGroup;

  taskname = new FormControl("", [Validators.required])
  workingHours = new FormControl("", [Validators.required, Validators.pattern("[0-9]*")])
  status = new FormControl("To Do", [Validators.required])
  user = new FormControl("", [Validators.required])

  id
  curr_task
  errorMessageBoolean: boolean = true
  userList
  savedMessage: boolean = true

  constructor(private fb: FormBuilder, private _Activatedroute:ActivatedRoute, private service: Service) {
    this.form = fb.group({
      "taskname": this.taskname,
      "workingHours": this.workingHours,
      "status": this.status,
      "user": this.user
    })

  }

  

  ngOnInit(): void {
    this.service.getUsers().subscribe({
      next: result => {
        this.userList = result;
      },
      error: err => {
        console.log(err)
      }
    })
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.service.getTaskById(this.id).subscribe({
      next: result => {
        this.service.getStatus(result.statusId.toString()).subscribe({
          next: stat_result => {
            this.curr_task = result,
            this.taskname.setValue(result.name)
            this.workingHours.setValue(result.workingHours)
            this.status.setValue(stat_result.status1)
            this.user.setValue(result.userId)
            
          }
        })

        
      }, 
      error: err => console.log(err)
    })
  }

  changeStatus(): void {
    this.service.nextStatus(this.status.value).subscribe({
      next: result => {
        this.status.setValue(result.status1)
      }
    })
  }


  save(): void {
    if (this.form.valid) {
      this.errorMessageBoolean = true
      let newTask: CreateTaskModel ={
        taskName: this.taskname.value,
        workingHours: this.workingHours.value,
        currentStatus: this.status.value,
        userId: this.user.value
      }
      console.log(newTask)
      this.service.createTask(newTask).subscribe({
        next: result => {
          console.log(result),
          this.savedMessage = false;
        },
        error: err => console.log(err)
      });
      console.log(newTask);
    } else {
      this.errorMessageBoolean = false
      this.savedMessage = true;
    }
  }

}

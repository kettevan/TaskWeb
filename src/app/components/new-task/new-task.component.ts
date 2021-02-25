import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CreateTaskModel, Users } from 'src/app/Models/Models';
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  form: FormGroup;

  taskname = new FormControl("", [Validators.required])
  workingHours = new FormControl("", [Validators.required, Validators.pattern("[0-9]*")])
  status = new FormControl("To Do", [Validators.required])
  user = new FormControl("", [Validators.required])


  constructor(private fb: FormBuilder, private service: Service) { 
    this.form = fb.group({
      "taskname": this.taskname,
      "workingHours": this.workingHours,
      "status": this.status,
      "user": this.user
    })
  }


  userList;
  errorMessageBoolean: boolean = true
  savedMessage: boolean = true

  ngOnInit(): void {
    
    this.service.getUsers().subscribe({
        next: result => {
          this.userList = result;
        },
        error: err => {
          console.log(err)
        }
      })
  }

  createTask() {
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
      this.errorMessageBoolean = false;
      this.savedMessage = false;
    }
  }

  

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NewTaskComponent } from './components/new-task/new-task.component';

const routes: Routes = [
  {path: 'main', component: MainPageComponent},
  {path: 'newTask', component: NewTaskComponent},
  {path: 'edit/:id', component: EditPageComponent},
  {path: '',   redirectTo: '/main', pathMatch: 'full' },
  {path: '**', component: MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

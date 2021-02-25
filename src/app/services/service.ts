import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CreateTaskModel, Status, Tasks, Users } from '../Models/Models';

@Injectable({
    providedIn: 'root'
})
export class Service {
    private mainUrl = 'https://localhost:5001/api/task/';

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Credentials' : 'true',
                                'Access-Control-Allow-Methods' : 'GET,POST,OPTIONS'});

    public getUsers() {
        const fullUrl = this.mainUrl + 'Users';
        return this.http.get<Users>(fullUrl, {headers: this.headers}).pipe(
            catchError(this.handleError)
        );
    }

    public createTask(task: CreateTaskModel): Observable<boolean> {
        let url: string = this.mainUrl + 'NewTask' 
        return this.http.post<boolean>(url, task, {headers: this.headers})
        .pipe(
            catchError(this.handleError)
        );
    }

    public getAllTasks() {
        const fullUrl = this.mainUrl + 'Tasks';
        return this.http.get<Tasks>(fullUrl).pipe(
            catchError(this.handleError)
        )
    }

    public getTaskById(id: string) {
        const fullUrl = this.mainUrl + 'TaskById?id=' + id;
        return this.http.get<Tasks>(fullUrl).pipe(
            catchError(this.handleError)
        )
    }

    public getStatus(id: string) {
        const fullUrl = this.mainUrl + 'StatusById?id=' + id;
        return this.http.get<Status>(fullUrl).pipe(
            catchError(this.handleError)
        )
    }

    public nextStatus(currStatus: string) {
        const fullUrl = this.mainUrl + 'NextStatus?currStatus=' + currStatus;
        return this.http.get<Status>(fullUrl).pipe(
            catchError(this.handleError)
        )
    }
    

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if(err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        return throwError(errorMessage);
    }

}
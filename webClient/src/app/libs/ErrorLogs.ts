import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import {  HttpHeaders } from "@angular/common/http";
export class ErrorLogs {
  constructor() { }

  public static handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error}`);
      // we navigate to proper error page..
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}


export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


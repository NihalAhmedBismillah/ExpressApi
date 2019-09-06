import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ErrorLogs, httpOptions } from './../libs/ErrorLogs';
import { catchError } from 'rxjs/operators';
import { baseApiUrl } from './../libs/constant';

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   *get all users details
   */
  public getUserDetails(): Observable<any> {
    const url = `${baseApiUrl}/api/v1/users`;
    return this.http.get<any>(url, httpOptions)
      .pipe(catchError(ErrorLogs.handleError<any>(`getUserDetails`)));
  }

  /**
   * get user details byId
   * @param id
   */
  public getUserDetailsById(id: string): Observable<any> {
    const url = `${baseApiUrl}/api/v1/users/${id}`;
    return this.http.get<any>(url, httpOptions)
      .pipe(catchError(ErrorLogs.handleError<any>(`getUserDetailsById=${id}`)));
  }

  /**
   * update user details
   * @param updateData
   * @param id
   */

  public updateUserDetails(updateData: any, id: string): Observable<any> {
    const url = `${baseApiUrl}/api/v1/user/${id}`;
    return this.http.put<any>(url, updateData, httpOptions)
      .pipe(catchError(ErrorLogs.handleError<any>(`updateUserDetails=${id}`)));
  }
  /**
   * Remove user
   * @param id
   */
  public removeUser(id: string): Observable<any> {
    const url = `${baseApiUrl}/api/v1/users/${id}`;
    return this.http
      .request<any>('DELETE', url, httpOptions)
      .pipe(catchError(ErrorLogs.handleError<any>(`removeUser=${id}`)));
  }
  /**
   *
   * @param save user
   */
  public saveUser(postData: any): Observable<any> {
    const url = `${baseApiUrl}/api/v1/users`;
    return this.http.post<any>(url, postData, httpOptions)
      .pipe(catchError(ErrorLogs.handleError<any>(`saveUser=${postData}`)));
  }
}

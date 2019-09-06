import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ErrorLogs, httpOptions } from '../libs/ErrorLogs'
import { catchError } from 'rxjs/operators';
import { baseApiUrl } from '../libs/constant';

@Injectable({
  providedIn: "root"
})
export class HobbiesService {

  constructor(private http: HttpClient) { }

  /**
   *get all hobbies details
   */
  public getHobbiesDetails(): Observable<any> {
    const url = `${baseApiUrl}/api/v1/hobbies`;
    return this.http.get<any>(url, httpOptions)
    .pipe(catchError(ErrorLogs.handleError<any>(`getHobbiesDetails`)));
  }

  /**
   * get hobby details byId
   * @param id
   */
  public getHobbyDetailsById(id: string): Observable<any> {
    const url = `${baseApiUrl}/api/v1/hobbies/${id}`;
    return this.http.get<any>(url, httpOptions)
    .pipe(catchError(ErrorLogs.handleError<any>(`getHobbiesDetailsById=${id}`)));
  }

  /**
   * updateHobbiesDetails
   * @param updateData
   * @param id
   */

  public updateHobbyDetails(updateData: any, id: string): Observable<any> {
    const url = `${baseApiUrl}/api/v1/hobbies/${id}`;
    return this.http.put<any>(url, updateData, httpOptions)
    .pipe(catchError(ErrorLogs.handleError<any>(`updateHobbiesDetails=${id}`)));
  }
  /**
   * Remove hobby
   * @param id
   */
  public removeHobby(id: string): Observable<any> {
    const url = `${baseApiUrl}/api/v1/hobbies/${id}`;
    return this.http
      .request<any>('DELETE', url, httpOptions)
      .pipe(catchError(ErrorLogs.handleError<any>(`removeHobbies=${id}`)));
  }
  /**
   *
   * @param save hobby
   */
  public saveHobby(postData: any): Observable<any> {
    const url = `${baseApiUrl}/api/v1/hobbies`;
    return this.http.post<any>(url, postData, httpOptions)
      .pipe(catchError(ErrorLogs.handleError<any>(`saveHobbies=${postData}`)));
  }
}

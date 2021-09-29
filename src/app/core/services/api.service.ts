import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class ApiService {
  constructor(protected http: HttpClient) { }

  getPage<T>(path: string, search: any, params: HttpParams = new HttpParams()): Observable<T> {
    const array = Object.getOwnPropertyNames(search);

    for (let i = 0; i < array.length; i++) {
      params = params.set(array[i], search[array[i]]);
    }

    const options = { params: params };
    return this.http.get<T>(`${environment.baseUrl}${path}`, options);
  }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${environment.baseUrl}${path}`, { params });
  }

  put<T>(path: string, body: Object = {}): Observable<T> {
    return this.http.put<T>(
      `${environment.baseUrl}${path}`,
      JSON.stringify(body));
  }

  post<T>(path: string, body: Object = {}): Observable<T> {
    return this.http.post<T>(
      `${environment.baseUrl}${path}`,
      JSON.stringify(body));
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(
      `${environment.baseUrl}${path}`);
  }
}
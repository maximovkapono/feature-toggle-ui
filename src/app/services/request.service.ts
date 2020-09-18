import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }

  private static buildUrl(partUrl: string): string {
    return `${environment.apiUrl}/${partUrl}`;
  }

  get(endPoint: string): Observable<any> {
    return this.http.get<any>(RequestService.buildUrl(endPoint));
  }

  post(endPoint: string, params: any): Observable<any> {
    return this.http.post<any>(RequestService.buildUrl(endPoint), JSON.stringify(params), httpHeaders);
  }
}

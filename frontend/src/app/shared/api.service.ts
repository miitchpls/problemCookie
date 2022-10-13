import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private backendUri = 'https://testUri.cloudfunctions.net/backend/api/';

  constructor(private httpClient: HttpClient) {}

  public post(apiUrl: string, body: any, options?: any): Observable<any> {
    return this.httpClient.post(`${this.backendUri}${apiUrl}`, body, options);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private baseUrl = 'https://ipwho.is/';

  constructor(private http: HttpClient) {}

  // Ottieni dati del proprio IP
  getMyIp(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Ottieni dati di un IP specifico
  getIpData(ip: string): Observable<any> {
    return this.http.get(this.baseUrl + ip);
  }
}

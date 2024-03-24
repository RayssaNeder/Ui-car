import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeService {

  private apiUrl = environment["apiUrl"] + "/api/me";

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> {

    return this.http.get<any>(this.apiUrl);
  }

}

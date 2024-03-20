
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(private httpClient: HttpClient) {
    }

    private readonly baseUrl = environment["endPoint"];

    login(username: string, password: string) {
      const body = { username: username, password: password };
        return this.httpClient.post<any>(`${this.baseUrl}/authenticate`, body);
    }


}

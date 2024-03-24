import { throwError } from 'rxjs';
import { ErrorDialogComponent } from './../components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment.prod';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    constructor(private httpClient: HttpClient, private dialog: MatDialog) {
    }

    private readonly baseUrl = environment["apiUrl"];

    login(username: string, password: string) {
      const body = { username: username, password: password };
        return this.httpClient.post<any>(`${this.baseUrl}/authenticate`, body).pipe(
          catchError(this.handleError)
        );
    }

    private handleError = (error: HttpErrorResponse) => {
      if (error.error instanceof ErrorEvent) {
        console.error('Ocorreu um erro:', error.error.message);
      } else {
        console.error(
          `Código do erro ${error.status}, ` +
          `mensagem: ${error.error.message}`
        );

        this.dialog.open(ErrorDialogComponent, {
          data: {
            code: error.status,
            message: error.error.message
          }
        });
      }
      return throwError('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
    }



}

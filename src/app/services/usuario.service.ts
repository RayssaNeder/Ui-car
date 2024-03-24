import { throwError } from 'rxjs';
import { ErrorDialogComponent } from './../components/error-dialog/error-dialog.component';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment.prod';
import { Usuario } from '../models/Usuario';



@Injectable({
    providedIn: 'root'
})

export class UsuarioService {

    constructor( private httpClient : HttpClient, private dialog: MatDialog)
    {
    }

    private readonly baseURL = environment["apiUrl"];

    AdicionarUsuario(usuario:Usuario)
    {
        return  this.httpClient.post<Usuario>(`${this.baseURL}/api/users`,
        usuario)
    }

    ListarUsuario()
    {
        return  this.httpClient.get(`${this.baseURL}/api/users`).pipe(
          catchError(this.handleError)
        );
    }

    ObterUsuario(id: number) {
      return this.httpClient.get(`${this.baseURL}/api/users/${id}`).pipe(
        catchError(this.handleError)
      );
  }

  AtualizarUsuario(usuario: Usuario, id: number) {
    return this.httpClient.put<Usuario>(`${this.baseURL}/api/users/${id}`,
    usuario).pipe(
      catchError(this.handleError)
    );
  }

  DeletarUsuario(id: number) {
    return this.httpClient.delete<Usuario>(`${this.baseURL}/api/users/${id}`).pipe(
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

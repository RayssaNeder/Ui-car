import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './../components/error-dialog/error-dialog.component';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment.prod';
import { Carro } from '../models/Carro';

@Injectable({
    providedIn: 'root'
})

export class CarroService {

    constructor( private httpClient : HttpClient, private dialog: MatDialog) { }

    private readonly baseURL = environment["apiUrl"];

    AdicionarCarro(carro:Carro)
    {
        return  this.httpClient.post<Carro>(`${this.baseURL}/api/cars`,
        carro).pipe(
          catchError(this.handleError)
        );
    }

    ListaCarro() {
      return this.httpClient.get(`${this.baseURL}/api/cars`).pipe(
        catchError(this.handleError)
      );
  }

  ObterCarro(id: number) {
    return this.httpClient.get(`${this.baseURL}/api/cars/${id}`).pipe(
      catchError(this.handleError)
    );
}

AtualizarCarro(carro: Carro, id: number) {
  return this.httpClient.put<Carro>(`${this.baseURL}/api/cars/${id}`,
      carro).pipe(
        catchError(this.handleError)
      );
}


DeletarCarro(id: number) {
  return this.httpClient.delete<Carro>(`${this.baseURL}/api/cars/${id}`).pipe(
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

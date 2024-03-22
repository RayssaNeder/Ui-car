import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { Carro } from '../models/Carro';




@Injectable({
    providedIn: 'root'
})

export class CarroService {

    constructor( private httpClient : HttpClient)
    {
    }

    private readonly baseURL = environment["endPoint"];

    AdicionarCarro(carro:Carro)
    {
        return  this.httpClient.post<Carro>(`${this.baseURL}/api/cars`,
        carro)
    }


    ListaCarro() {
      return this.httpClient.get(`${this.baseURL}/api/cars`);
  }


  ObterCarro(id: number) {
    return this.httpClient.get(`${this.baseURL}/api/cars/${id}`);
}

AtualizarCarro(carro: Carro, id: number) {
  return this.httpClient.put<Carro>(`${this.baseURL}/api/cars/${id}`,
      carro)
}


DeletarCarro(id: number) {
  return this.httpClient.delete<Carro>(`${this.baseURL}/api/cars/${id}`)
}





}

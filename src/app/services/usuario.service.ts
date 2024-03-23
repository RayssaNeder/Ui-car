import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment.prod';
import { Usuario } from '../models/Usuario';



@Injectable({
    providedIn: 'root'
})

export class UsuarioService {

    constructor( private httpClient : HttpClient)
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
        return  this.httpClient.get(`${this.baseURL}/api/users`);
    }

    ObterUsuario(id: number) {
      return this.httpClient.get(`${this.baseURL}/api/users/${id}`);
  }

  AtualizarUsuario(usuario: Usuario, id: number) {
    return this.httpClient.put<Usuario>(`${this.baseURL}/api/users/${id}`,
    usuario)
  }

  DeletarUsuario(id: number) {
    return this.httpClient.delete<Usuario>(`${this.baseURL}/api/users/${id}`)
  }


}

import { Carro } from './Carro';
export class Usuario
{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    login: number;
    password: string;
    birthday: Date;
    cars: Carro[];
}

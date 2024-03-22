import { Carro } from './Carro';
export class Usuario
{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    login: number;
    password: Date;
    birthday: Date;
    cars: Carro[];
}

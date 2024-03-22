import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { CarroComponent } from './carro.component';
import { CarroRoutingModule } from './carro-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';


@NgModule(
    {
        providers: [],
        declarations: [CarroComponent],
        imports: [
            CommonModule,
            CarroRoutingModule,
            NavbarModule,
            SidebarModule,
            ReactiveFormsModule,


            NgxPaginationModule,
            FormsModule,
            NgSelectModule,
            MatIconModule
        ]
    }
)

export class CarroModule { }

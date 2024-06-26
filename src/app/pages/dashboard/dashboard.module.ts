import { SidebarModule } from './../../components/sidebar/sidebar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';


@NgModule(
    {
        providers:[],
        declarations:[DashboardComponent],
        imports:[
            CommonModule,
            DashboardRoutingModule,
            NavbarModule,
            SidebarModule
        ]
    }
)

export class DashboardModule{}

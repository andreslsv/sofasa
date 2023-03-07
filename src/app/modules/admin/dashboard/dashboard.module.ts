import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { DashboardComponent } from 'app/modules/admin/dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import {MatChipsModule} from '@angular/material/chips';


const dashboardRoutes: Route[] = [
    {
        path     : '',
        component: DashboardComponent
    }
];

@NgModule({
    declarations: [
    ],
    imports     : [
        RouterModule.forChild(dashboardRoutes),
        NgApexchartsModule,
        MatIconModule,
        MatChipsModule
    ]
})
export class DashboardModule
{
}
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import { DashboardColisionComponent } from './dashboard-colision.component';


const dashboardColisionRoutes: Route[] = [
    {
        path     : '',
        component: DashboardColisionComponent
    }
];

@NgModule({
    declarations: [
    ],
    imports     : [
        RouterModule.forChild(dashboardColisionRoutes),
        NgApexchartsModule,
        MatIconModule,
        MatTabsModule,
        MatExpansionModule,
        MatChipsModule
    ]
})
export class DashboardColisionModule
{
}
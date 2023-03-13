import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ColisionComponent } from 'app/modules/admin/colision/colision.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';

const colisionRoutes: Route[] = [
    {
        path     : '',
        component: ColisionComponent
    }
];

@NgModule({
    declarations: [
  ],
    imports     : [
        RouterModule.forChild(colisionRoutes),

        MatTableModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatPaginatorModule
    ]
})
export class ColisionModule
{
}
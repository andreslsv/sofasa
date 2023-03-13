import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MecanicaComponent } from 'app/modules/admin/mecanica/mecanica.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';

const mecanicaRoutes: Route[] = [
    {
        path     : '',
        component: MecanicaComponent
    }
];

@NgModule({
    declarations: [
  ],
    imports     : [
        RouterModule.forChild(mecanicaRoutes),

        MatTableModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatPaginatorModule
    ]
})
export class MecanicaModule
{
}
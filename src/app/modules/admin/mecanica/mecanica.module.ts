import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MecanicaComponent } from 'app/modules/admin/mecanica/mecanica.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';

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
        MatPaginatorModule,
        MatTooltipModule,
        MatSelectModule,
        MatSnackBarModule
    ]
})
export class MecanicaModule
{
}
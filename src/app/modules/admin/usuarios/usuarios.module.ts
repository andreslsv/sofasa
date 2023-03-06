import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UsuariosComponent } from 'app/modules/admin/usuarios/usuarios.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ListaComponent } from './lista/lista.component';

const exampleRoutes: Route[] = [
    {
        path     : '',
        component: UsuariosComponent
    }
];

@NgModule({
    declarations: [
    
    ListaComponent
  ],
    imports     : [
        RouterModule.forChild(exampleRoutes),

        MatTableModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatPaginatorModule
    ]
})
export class UsuariosModule
{
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import {MatIconModule} from '@angular/material/icon';
import { UsuariosComponent } from './modules/admin/usuarios/usuarios.component';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SubirExcelUsuariosComponent } from './modals/subir-excel-usuarios/subir-excel-usuarios.component';
import { AgregarUsuarioComponent } from './modals/agregar-usuario/agregar-usuario.component';
import { ColisionComponent } from './modules/admin/colision/colision.component';
import { MecanicaComponent } from './modules/admin/mecanica/mecanica.component';
import {MatSelectModule} from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';


const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        UsuariosComponent,
        SubirExcelUsuariosComponent,
        AgregarUsuarioComponent,
        ColisionComponent,
        MecanicaComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        NgApexchartsModule,
        ReactiveFormsModule,

        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatPaginatorModule,

        MatFormFieldModule,
        FormsModule,

        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatTabsModule,
        MatExpansionModule,
        MatChipsModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({})
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}

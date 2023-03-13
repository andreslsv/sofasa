/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'mecanica',
        title: 'Capacidad servicio mecanica',
        type : 'basic',
        icon : 'heroicons_outline:clipboard-list',
        link : '/mecanica'
    },
    {
        id   : 'colision',
        title: 'Capacidad de Servicio Colisión',
        type : 'basic',
        icon : 'heroicons_outline:cube-transparent',
        link : '/colision'
    },
    {
        id   : 'dashboard',
        title: 'Dashboard',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/dashboard'
    },
    {
        id   : 'usuarios',
        title: 'Usuarios',
        type : 'basic',
        icon : 'heroicons_outline:user-group',
        link : '/usuarios'
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];

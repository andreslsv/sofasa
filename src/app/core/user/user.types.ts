
export interface User
{
    id: string;
    nombre: string;
    email: string;
    avatar?: string;
    status?: string;
    admin?: number;
    ubicacion?:{region?: string;zona?: string;sociedad?: string;sede?: string;}[];
}
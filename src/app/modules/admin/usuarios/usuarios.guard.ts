import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'app/core/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosGuard implements CanActivate {
  constructor(private _userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._userService.user$.pipe(map(usuario => {
        if (usuario?.admin==1) {
          return true;
        } else {
          this.router.navigate(['/mecanica']);
          return false;
        }
      }));
    
    
    
    
    
    
    
    /*.pipe(
      map(usuarioEstaAutenticado => {
        if (usuarioEstaAutenticado) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );*/
  }
}
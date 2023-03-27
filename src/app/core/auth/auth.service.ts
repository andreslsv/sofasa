import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AsyncSubject, catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;
    tokenLocalStorage$ = new AsyncSubject();

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getTokenDeLocalStorage(){
        const tokenLocalStorage = localStorage.getItem("accessToken");
        const usuarioLocalStorage = localStorage.getItem("usuario");
        this.accessToken = tokenLocalStorage;

        if (tokenLocalStorage) {
            this.tokenLocalStorage$.next({token:tokenLocalStorage,usuario:JSON.parse(usuarioLocalStorage)});
            this.tokenLocalStorage$.complete();
        }else{
            this.tokenLocalStorage$.error("El token no existe");
        }

        return tokenLocalStorage;
    }

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { empresa: string; usuario: string; clave: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this._httpClient.post('http://139.99.121.175:9091/CapacidadServicio/api/Usuario/ValidarUsuario', credentials).pipe(
            switchMap((response: any) => {

                const usuario = response.result.informacionUsuario.usuario;

                usuario.ubicacion = response.result.informacionUsuario.ubicacion

                // Store the access token in the local storage
                this.accessToken = response.result.token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = usuario;

                console.log("response.result.usuario =>", response.result.informacionUsuario.usuario);

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Renew token
        return this.tokenLocalStorage$.pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                console.log("Respuesta desde tokenLocalStorage$", response);

                // Store the access token in the local storage
                this.accessToken = response.token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.usuario;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated && this.getTokenDeLocalStorage())
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken || !this.getTokenDeLocalStorage())
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}

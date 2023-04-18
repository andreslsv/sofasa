import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { ApiService } from 'app/services/api.service';

@Component({
    selector     : 'auth-forgot-password',
    templateUrl  : './forgot-password.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthForgotPasswordComponent implements OnInit
{
    @ViewChild('forgotPasswordNgForm') forgotPasswordNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    forgotPasswordForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _apiService:ApiService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            codigoBir: ['', [Validators.required]],
            cedula: ['', [Validators.required]]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Send the reset link
     */
    sendResetLink(): void
    {
        // Return if the form is invalid
        if ( this.forgotPasswordForm.invalid )
        {
            return;
        }

        // Disable the form
        this.forgotPasswordForm.disable();

        // Hide the alert
        this.showAlert = false;

        const valores = this.forgotPasswordForm.value;

        const nodo = ["Usuario/OlvideContraseña"];
        const paramsDefault={id:0,email:valores.email,codigoBir:valores.codigoBir,cedula:valores.cedula};
    
        this._apiService.postQuery(nodo[0],"",paramsDefault).pipe(
            finalize(() => {

                
                this.forgotPasswordForm.enable();

                
                this.forgotPasswordNgForm.resetForm();

                
                this.showAlert = true;
            })
        )
        .subscribe(
            async(data:any)=>{
                this.alert = {
                    type   : 'success',
                    message: 'El mensaje ha sido enviado correctamente a su correo.'
                };
            },
            async(data:any)=>{
                this.alert = {
                    type   : 'error',
                    message: 'Credenciales no encontradas'
                };
            }
            );

        // Forgot password
        /*this._authService.forgotPassword(this.forgotPasswordForm.get('email').value)
            .pipe(
                finalize(() => {

                    
                    this.forgotPasswordForm.enable();

                    
                    this.forgotPasswordNgForm.resetForm();

                    
                    this.showAlert = true;
                })
            )
            .subscribe(
                (response) => {

                    
                    this.alert = {
                        type   : 'success',
                        message: 'Password reset sent! You\'ll receive an email if you are registered on our system.'
                    };
                },
                (response) => {

                    
                    this.alert = {
                        type   : 'error',
                        message: 'Email does not found! Are you sure you are already a member?'
                    };
                }
            );*/
    }
}

import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../Services/userClientHttpCall';
import {Router, RouterModule} from '@angular/router'

@Component({
    selector: 'login',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./login.scss')],
    template: require('./login.html'),
})
export class Login {
    public form: FormGroup;
    public email: AbstractControl;
    public password: AbstractControl;
    public submitted: boolean = false;
    //public invalidInput:boolean = false;
    public loginError: string = "";
    useData: string;
    data: any;
    public wrongpassword: boolean = false;
    public wrongemail: boolean = false;

    constructor(fb: FormBuilder, private userService: UserService, private router: Router) {

        this.form = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });

        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        this.wrongemail = false;
        this.wrongpassword = false;

    }

    public onSubmit(values: Object): void {

        this.submitted = true;
        if (this.form.valid) {
            // console.log(this.form.valid);
            this.data = {
                email: values.email,
                password: values.password
            };
            // console.log("value",this.data);
            this.userService.userLogin(this.data).subscribe(
                data => this.loginSucces(data),
                error => this.loginFail(error)
            );
        }
    }

    public loginSucces(result) {
        console.log("successfully login");
        this.wrongpassword = false;
        this.wrongemail = false;
        localStorage.setItem('token', result.token);

        this.router.navigate(['dashboard']);

    }

    public loginFail(error) {
        console.log("fail to login");
        this.wrongemail = true;
        this.wrongpassword = true;
        console.log(error);
        //this.invalidInput = true;
        this.submitted = false;
        this.loginError = error.error_message;
    }

}

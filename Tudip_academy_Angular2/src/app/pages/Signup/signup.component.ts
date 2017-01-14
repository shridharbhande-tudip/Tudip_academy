import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { UserService } from '../../Services/userClientHttpCall';
import { Router, RouterModule } from '@angular/router'
@Component({
  selector: 'SignUp',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./signup.scss')],
  template: require('./signup.html'),
})
export class SignUp {
  public form:FormGroup;
  public email:AbstractControl;
  public name:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;
  public invalidInput:boolean = false;
  public loginError:string = "";
  useData: string;
  data:any;

  constructor(fb:FormBuilder,private userService: UserService,private router: Router) {
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
   
  }

  public onSubmit(values:Object):void {


    console.log("I am inside the singUp");
      // your code goes here
   
      this.data = {
        name: values.name,
        email: values.email,
        password: values.password
      };
      console.log("value",this.data);
      this.userService.userSignup(this.data).subscribe(
        data => this.signupSucces(data),
        error =>  this.signupFail(error)
      );
   
  }
 public signupSucces(result) {
 localStorage.setItem('token',result.token);
 this.router.navigate(['dashboard']);

  }
  public signupFail(error){

    console.log(error);
    this.invalidInput = true;
    this.submitted = false;
    this.loginError = error.error_message;
  }

}

import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../Services/userClientHttpCall';
import {Router, RouterModule} from '@angular/router'
@Component({
    selector: 'addVisitor',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./addVisitor.scss')],
    template: require('./addVisitor.html'),
})
export class AddVisitor {
    public form: FormGroup;
    public name: AbstractControl;
    public email: AbstractControl;
    public mobile: AbstractControl;
    public in_time: AbstractControl;
    public out_time: AbstractControl;
    data: any;
    public submitted: boolean = false;
    public invalidinput: boolean = false;


    constructor(fb: FormBuilder, private userService: UserService, private router: Router) {

        this.form = fb.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'in_time': ['', Validators.compose([Validators.required])],
            'mobile': ['', ([Validators.minLength(10), Validators.maxLength(10)])],
            'out_time': ['']

        });
        this.email = this.form.controls['email'];
        this.name = this.form.controls['name'];
        this.mobile = this.form.controls['mobile'];
        this.in_time = this.form.controls['in_time'];
        this.out_time = this.form.controls['out_time'];
    }

    public onSubmit(values: Object): void {
        this.addVisitor(values);
        // console.log('in add vis');
    }

    public addVisitor(values) {
        console.log("Values", values)
        var in_time = 1471115538;
        var out_time = 1471115539;

        this.invalidinput = false;


        this.data = {
            name: values.name,
            email: values.email,
            phone_no: values.mobile
        };

        //console.log("Data"+this.data)
        this.userService.addVisitor(this.data).subscribe(
            data => this.addsuccess(data),
            error => this.addFail(error)
        )
    };

    private addsuccess(result) {
        // window.confirm("New Visitor Added Successfully");
        this.router.navigate(['viewVisitor']);
        // console.log(result);
    }

    private addFail(error) {
        console.log('error');
    }
}
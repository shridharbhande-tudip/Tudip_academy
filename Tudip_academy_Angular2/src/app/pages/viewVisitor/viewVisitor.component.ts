import {Component, ViewEncapsulation} from '@angular/core';
import {UserService} from '../../Services/userClientHttpCall';
import {Router, RouterModule} from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';



@Component({
    selector: 'viewVisitor',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./viewVisitor.css')],
    template: require('./viewVisitor.html'),
})

export class viewVisitor {
    public form:FormGroup;
    public update: Boolean = false;
    public email:AbstractControl;
    public name:AbstractControl;
    public phone_no:AbstractControl;
    public in_time:AbstractControl;
    public out_time:AbstractControl;
    public view_visit: Boolean = true;
    allVisitor: any = [];
    id: any;

    visitor_edited: any;

    constructor(fb:FormBuilder,private userService: UserService, private router: Router) {
        this.form = fb.group({
            'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'phone_no': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
            'in_time': ['', Validators.compose([Validators.required])],
            'out_time': ['', Validators.compose([Validators.required])]
        });

        this.name = this.form.controls['name'];
        this.email = this.form.controls['email'];
        this.phone_no = this.form.controls['phone_no'];
        this.in_time = this.form.controls['in_time'];
        this.out_time = this.form.controls['out_time'];

        this.viewVisitors();

    }

    private viewVisitors() {
        this.userService.viewVisitor().subscribe(
            data => this.viewSuccess(data),
            error => this.viewFail(error)
        );
    }

    private viewSuccess(data) {
        console.log(data);
        this.allVisitor = [];
        this.allVisitor = data;
    }

    private viewFail(error) {
        console.log(error);
    }

    visitordelete(id) {

        console.log("delete");

        this.userService.deletevis(id).subscribe(
            data => this.getVisitor(),
            error => this.deleteFail(error));


    }

    public edit(visitor: any) {
        this.update = true;
        this.view_visit = false;
        this.visitor_edited = visitor;
    }


    public onupdate(res) {

        this.userService.getAllVisitor().subscribe(
            data => this.getAll(data),
            error => this.Error(error)
        )

    }

    public getVisitor() {
        this.userService.getAllVisitor().subscribe(
            data => this.getAll(data),
            error => this.Error(error)
        )

    }

    public getAll(data) {
        console.log("get data", data);
        this.allVisitor = data;

       //location reload
        location.reload();
        this.view_visit = true;

    }
    deleteFail(error) {
        console.log('error');

    }

    Error(error) {
        console.log("Error " + error);
    }

}
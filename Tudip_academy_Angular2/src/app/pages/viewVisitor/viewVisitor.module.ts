import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { UserService } from '../../Services/userClientHttpCall';
import { viewVisitor } from './viewVisitor.component';
import { routing }       from './viewVisitor.routing';
//import { Router, RouterModule } from '@angular/router'
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing 
  ],
  declarations: [
    viewVisitor
  ],
  providers: [ UserService ] 
})
export default class viewVisitorModule {}

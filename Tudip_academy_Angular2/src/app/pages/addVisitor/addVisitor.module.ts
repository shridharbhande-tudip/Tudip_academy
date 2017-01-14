import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { UserService } from '../../Services/userClientHttpCall';
import { AddVisitor } from './addVisitor.component';
import { routing }       from './addVisitor.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    AddVisitor
  ],
  providers: [ UserService ] 
})
export default class AddVisitorModule {}

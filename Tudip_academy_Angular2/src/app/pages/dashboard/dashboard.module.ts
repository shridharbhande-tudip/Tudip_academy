import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';
import { UserService } from '../../Services/userClientHttpCall';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    dashboard
  ],
  providers: [UserService]
})
export default class dashboardModule {}

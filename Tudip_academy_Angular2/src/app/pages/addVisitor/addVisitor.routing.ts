import { Routes, RouterModule }  from '@angular/router';

import { AddVisitor } from './addVisitor.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: AddVisitor
  }
];

export const routing = RouterModule.forChild(routes);

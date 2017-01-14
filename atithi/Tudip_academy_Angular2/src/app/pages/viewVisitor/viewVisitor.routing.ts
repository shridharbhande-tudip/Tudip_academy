import { Routes, RouterModule }  from '@angular/router';

import { viewVisitor } from './viewVisitor.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: viewVisitor
  }
];

export const routing = RouterModule.forChild(routes);

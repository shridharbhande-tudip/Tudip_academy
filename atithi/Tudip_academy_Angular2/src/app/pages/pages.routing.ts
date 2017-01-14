import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => System.import('./login/login.module')
  },
    {
    path: 'signup',
    // loadChildren: () => System.import('./signup/signup.module')
      loadChildren: () => System.import('./Signup/signup.module')
  },
  {
  path: 'dashboard',
  loadChildren: () => System.import('./dashboard/dashboard.module')
  },
  {
  path: 'addVisitor',
  loadChildren: () => System.import('./addVisitor/addVisitor.module')
  },
  {
  path: 'viewVisitor',
  loadChildren: () => System.import('./viewVisitor/viewVisitor.module')
  }


];

export const routing = RouterModule.forChild(routes);

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminInfoComponent } from './components/admin-info/admin-info.component';
import { GeneralComponent } from './components/general/general.component';

import { LoginComponent } from './components/login/login.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: GeneralComponent },
  { path: "user", component: UserInfoComponent },
  { path: "admin", component: AdminInfoComponent },
  { path: "", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: "ignore",
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

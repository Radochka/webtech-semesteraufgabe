import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { WunschlisteFormComponent } from './wunschlisten-page/wunschliste-form/wunschliste-form.component';
import { WunschlistenPageComponent } from './wunschlisten-page/wunschlisten-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { DatenComponent } from './daten/daten.component';

const routes: Routes = [
  {path: '', component: AuthLayoutComponent, children: [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent}
  ]},
  {path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
    {path: 'daten', component: DatenComponent},
    {path: 'wunschlisten', component: WunschlistenPageComponent},
    {path: 'wunschlisten/new', component: WunschlisteFormComponent},
    {path: 'wunschlisten/:id', component: WunschlisteFormComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

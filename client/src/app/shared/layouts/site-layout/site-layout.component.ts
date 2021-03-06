import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent {

  links = [
    //{url:'/daten', name: 'Meine Daten'},
    { url: '/wunschlisten', name: 'Alle Wunschlisten' },
    //{url:'/kinder', name: 'Kinder'},
  ]
  constructor(private auth: AuthService,
    private router: Router) { }

  logout() {
    this.auth.logout()
    this.router.navigate(['/login'])
  }

}

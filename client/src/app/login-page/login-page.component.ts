import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit, OnDestroy {

  //form!: FormGroup
  form: any = {
  email: null,
  password: null
  };
  aSub: any = Subscription

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if(params['registered']){ // wenn ich mich registiert habe, werde ich auf login weitergeleitet mit der nachricht, sich neu einzulogen
        MaterialService.toast('Jetzt können Sie sich noch einmal einloggen')
        //Jetzt können Sie sich noch einmal einloggen
      } else if(params['accessDenied']) { //falls Zugriff verweigert ist, kommt diese nachricht
        MaterialService.toast('Bitte authorizieren Sie sich')
        //Bitte sich authorizieren
      } else if(params['sessionFailed']) { //falls meine Session abgelaufen ist
        MaterialService.toast('Bitte loggen Sie sich erneut ein')
      }
    })
  }

  ngOnDestroy() { // 
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable() //mach die form nicht funktionsfähig bis die Daten eingefügt werden
    this.aSub = this.auth.login(this.form.value).subscribe(
      ()=> this.router.navigate(['/wunschlisten']),
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

}

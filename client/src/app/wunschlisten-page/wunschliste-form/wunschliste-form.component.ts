import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { response } from 'express';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Wunschliste } from 'src/app/shared/interface';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wunschliste-form',
  templateUrl: './wunschliste-form.component.html',
  styleUrls: ['./wunschliste-form.component.css']
})
export class WunschlisteFormComponent implements OnInit {
  @ViewChild('input') inputRef!: ElementRef

  form: any = {
    name: null,
    datum: null,
    user: null,
    imageSrc: null
  };
  image!: File
  imagePreview: any = ''
  isNew = true
  wunschliste!: Wunschliste;

  constructor(private route: ActivatedRoute,
    private wl: WishlistService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      datum: new FormControl(null, Validators.required)
    })
    this.form.disable()
    //wir hören ab, ob ein id existiert
    this.route.params.pipe(switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false
            return this.wl.getList(params['id'])
          }
          //falls nichts gibt, dann null rausgeben
          return of(null)
        })).subscribe(//wir abonnieren dann stream
        wunschliste => {
          if (wunschliste) {
            this.wunschliste = wunschliste
            /* Verwenden Sie die patchValue()-Methode zum Ersetzen aller im Objekt definierten
            Eigenschaften, die sich im Formularmodell geändert haben.*/
            this.form.patchValue({
              name: wunschliste.name,
              datum: wunschliste.datum
            })
            this.imagePreview = wunschliste.imageSrc
            MaterialService.updateTextInputs()
          }
          this.form.enable()// diese funktion schalte die form ein
        },
        error => MaterialService.toast(error.error.message)
      )
  }

  //Click auf Button und kommt fenster zum Bild auswählen
  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  //Bild hochladen
  onFileUpload(event: any) {
    //zugang zu dem file, den wir hochgeladen haben
    const file = event.target.files[0]
    this.image = file
    //preview dieses files
    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(file)
  }

  deleteWunschliste() {
    const decision = window.confirm(`Wunschliste "${this.wunschliste.name}" löschen?`)
    if (decision) {
      if (this.wunschliste._id != null) {
        this.wl.removeList(this.wunschliste._id)
          .subscribe(
            response => MaterialService.toast(response.message),
            error => MaterialService.toast(error.message),
            () => this.router.navigate(['/wunschlisten'])
          )
      }
    }
  }

  onSubmit() {
    let obs$ // um beide streams zu bearbeiten
    this.form.disable()
    if (this.isNew) {
      //create
      obs$ = this.wl.createList(this.form.value.name, this.form.value.datum, this.image)
      this.router.navigate(['/wunschlisten'])
    } else {
      //update
      obs$ = this.wl.updateList(this.wunschliste._id, this.form.value.name, this.form.value.datum, this.image)

    }
    obs$.subscribe( //abonnieren
      wunschliste => {
        this.wunschliste = wunschliste
        MaterialService.toast('Änderungen sind gespeichert')
        this.form.enable()
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      }
    )
  }


}

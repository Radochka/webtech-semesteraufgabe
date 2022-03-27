import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Position } from 'src/app/shared/interface';
import { PositionService } from 'src/app/shared/services/position.service';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.css']
})
export class PositionFormComponent implements OnInit, AfterViewInit, OnDestroy {
  //ich erwarte input wunschlisteId als string
  @Input('wunschlisteId') wunschlisteId!: string;
  @ViewChild('modal') modalRef!: ElementRef
  positions: Position[] = []
  positionId!: string | undefined
  modal!: MaterialInstance
  form!: FormGroup

  constructor(private ps: PositionService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      link: new FormControl('')
    })
    //   debugger
    //hier werden wir alle Position abrufen
    this.ps.getAll(this.wunschlisteId).subscribe(positions => {
      this.positions = positions
    })
  }

  //wir bekommen zugriff auf html nur dann wenn content geladen wurde
  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  //diese Methode vernichtet Modalfenster, wenn die Seite geschlossen wird
  ngOnDestroy(): void {
    this.modal.destroy()
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id
    this.form.patchValue({
      title: position.title,
      link: position.link
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onAddPosition() {
    //hier fügen wir eine neue Position, daher ist die positionId leer
    this.positionId = ''
    this.form.reset({
      title: null,
      link: null,
      cost: 1
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }
  onCancel() {
    this.modal.close()
  }
  onDeletePostion(position: Position) {
    const decision = window.confirm(`Willst du wirklich diesen Wunsch "${position.title}" löschen?`)
    if(decision){
      this.ps.delete(position).subscribe(
        response => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions.splice(idx, 1)
          MaterialService.toast(response.messageString)
        },
        error => MaterialService.toast(error.error.message)
      )
    }
  }

  onSubmit() {
    this.form.disable()
    const newposition: Position = {
      title: this.form.value.title,
      link: this.form.value.link,
      wunschliste: this.wunschlisteId

    }

    const completed = () => {
      this.modal.close()
      this.form.reset({ title: '', link: '', cost: '' })
      this.form.enable()
    }

    //falls position nicht leer ist update, andersfalls createn wir eine neue position
    if(this.positionId) {
      newposition._id = this.positionId
      this.ps.update(newposition).subscribe(
        postion => {
          const idx = this.positions.findIndex(p => p._id === postion._id)
          this.positions[idx] = postion
          MaterialService.toast('Die Änderungen sind gespeichert')
        },
        error => MaterialService.toast(error.error.message),
        completed
      )

    } else {
      this.ps.create(newposition).subscribe(
        postion => {
          MaterialService.toast('Position wurde hinzugefügt')
          //mit mdem push hinzufügen wir die Position
          this.positions.push(postion)
        },
        error => MaterialService.toast(error.error.message),
        completed
      )
    }

    
  }
}

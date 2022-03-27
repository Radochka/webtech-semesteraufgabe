import {ElementRef} from "@angular/core";

declare var M: any

//Steuerung des Modalsfensters
export interface MaterialInstance {
  open(): void
  close(): void
  destroy(): void

}

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }

  //diese Methoder ruf die function des Materialize
  static updateTextInputs(){ 
    M.updateTextFields()
  }

  //Diese Methode für Modalfenster zu steuern (open(), delete(), close())
  static initModal(ref: ElementRef){
    return M.Modal.init(ref.nativeElement)
  }
}

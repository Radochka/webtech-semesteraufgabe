import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wunschliste, Message } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }
  getLists(): Observable<Wunschliste[]>{
    return this.http.get<Wunschliste[]>('api/wunschlisten')
  }
  getList(id: string): Observable<Wunschliste> {
    return this.http.get<Wunschliste>(`api/wunschlisten/${id}`)
  }
  createList(name: string, datum: string, image?: File): Observable<Wunschliste>{
    const fd = new FormData() //object, den wir absenden werden
    if(image){ //wenn image gibt
      fd.append('image', image, image.name)//hinzufügen
    }
    fd.append('name', name)
    fd.append('datum', datum)
    return this.http.post<Wunschliste>('/api/wunschlisten', fd)
  }
  updateList(id: any, name: string, datum: string, image?: File): Observable<Wunschliste> {
    const fd = new FormData()
    if(image){
      fd.append('image', image, image.name)
    }
    fd.append('name', name)
    fd.append('datum', datum)
    return this.http.put<Wunschliste>(`/api/wunschlisten/${id}`, fd)

  }
  removeList(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/wunschlisten/${id}`)
  }
}


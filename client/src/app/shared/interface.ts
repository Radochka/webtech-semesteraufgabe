export interface User {
    name: string
    email: string
    password: string
    geburtsdatum: string
    role?: string
    user?: string
    _id: string
  }
  
  export interface Wunschliste {
    name: string
    datum: string
    imageSrc?: string
    user?: string
    _id: string
  }
  
  export interface Message {
    message: string
  }
  
  export interface Position {
    title: string
    link?: string
    imageSrc?: string
    cost?: number
    user?: string
    wunschliste: string
    _id?: string
  }
  
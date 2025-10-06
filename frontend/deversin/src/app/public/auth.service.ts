import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


}

export enum role {
  ALUNO= 'ALUNO',
  PROFESSOR = 'PROFESSOR',
}

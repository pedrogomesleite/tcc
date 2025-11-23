import {inject, Injectable} from '@angular/core';
import {BaseService} from '../shared/service/base.service';
import {lastValueFrom} from 'rxjs';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  tokenService: TokenService = inject(TokenService);

  public alunoSignup(aluno: any) {
    return lastValueFrom(this.http.post<any>(this.urlAuth + '/aluno/signup', aluno));
  }

  public professorSignup(professor: any) {
    return lastValueFrom(this.http.post<any>(this.urlAuth + '/professor/signup', professor));
  }

  public alunoLogin(aluno: any) {
    return lastValueFrom(this.http.post<any>(this.urlAuth + '/aluno/login', aluno)).then((data) => {
      this.tokenService.setToken(data.token);
      return data;
    });
  }

  public professorLogin(professor: any) {
    return lastValueFrom(this.http.post<any>(this.urlAuth + '/professor/login', professor)).then((data) => {
      this.tokenService.setToken(data.token);
      return data;
    });
  }
}

export enum role {
  ALUNO= 'ALUNO',
  PROFESSOR = 'PROFESSOR',
}

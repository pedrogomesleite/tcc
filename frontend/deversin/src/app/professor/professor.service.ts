import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {Tema} from '../model/tema.model';
import {PageResult} from '../shared/models/page-result.model';
import {BaseService} from '../shared/service/base.service';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService extends BaseService {



  constructor() {
    super();
  }

  public listarTemas() {
    return lastValueFrom(this.http.get<Tema[]>(this.urlTema + '/listar-base'));
  }

  public criarAtividade(atividade: any) {
    return lastValueFrom(this.http.post(this.urlAtividade + '/salvar', atividade));
  }

  public listarAtividaes() {
    return lastValueFrom(this.http.get<any[]>(this.urlAtividade + '/listar-base'));
  }

  public listarAtividaesComFiltro(filtro: string) {
    return lastValueFrom(this.http.get<any[]>(this.urlAtividade + '/listar/' + filtro));
  }

  public getAtividadeById(id: string) {
    return lastValueFrom(this.http.get<any>(this.urlAtividade + '/buscar-base/' + id));
  }


  public criarTurma(turma: any) {
    return lastValueFrom(this.http.post(this.urlTurma + '/salvar', turma));
  }
}

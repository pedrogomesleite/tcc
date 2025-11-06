import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {Tema} from '../model/tema.model';
import {PageResult} from '../shared/models/page-result.model';

@Injectable({
  providedIn: 'root',
  deps: [HttpClient],
  useFactory: (http: HttpClient) => new ProfessorService(http),
})
export class ProfessorService {

  private http: HttpClient;

  // private urlProfessor = 'http://localhost:8080/professor';
  private urlAtividade = 'http://localhost:8080/atividade';
  private urlTema = 'http://localhost:8080/tema';
  private urlTurma = 'http://localhost:8080/turma';


  constructor(http: HttpClient) {
    this.http = http;
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

  public getTurmaByCodigo(codigo: string) {
    return lastValueFrom(this.http.get<any>(this.urlTurma + '/codigo/' + codigo));
  }


  public criarTurma(turma: any) {
    return lastValueFrom(this.http.post(this.urlTurma + '/salvar', turma));
  }

  public listarTurmasPaginado(options: { first?: number; rows?: number; sortField?: string; sortOrder?: number; filter?: string } = {}) {
    const params = this.getParams(options);
    return lastValueFrom(this.http.get<PageResult<any>>(`${this.urlTurma}/listar-paginado`, { params }));
  }

  public listarAtividadesPaginado(options: { first?: number; rows?: number; sortField?: string; sortOrder?: number; filter?: string } = {}) {
    const params = this.getParams(options);
    return lastValueFrom(this.http.get<PageResult<any>>(`${this.urlAtividade}/listar-paginado`, { params }));
  }

  private getParams(options: {
    first?: number;
    rows?: number;
    sortField?: string;
    sortOrder?: number;
    filter?: string
  }) {
    let params = new HttpParams();
    if (options.first != null) params = params.set('first', String(options.first));
    if (options.rows != null) params = params.set('rows', String(options.rows));
    if (options.sortField) params = params.set('sortField', options.sortField);
    if (options.sortOrder != null) params = params.set('sortOrder', String(options.sortOrder));
    if (options.filter) params = params.set('filter', options.filter);
    return params;
  }
}

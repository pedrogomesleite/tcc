import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {PageResult} from '../models/page-result.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected urlAtividade = 'http://localhost:8080/atividade';
  protected urlTema = 'http://localhost:8080/tema';
  protected urlTurma = 'http://localhost:8080/turma';
  protected urlProfessor = 'http://localhost:8080/professor';
  protected urlAluno = 'http://localhost:8080/aluno';
  protected urlAuth = 'http://localhost:8080/auth';
  protected urlResposta = 'http://localhost:8080/resposta';

  protected http: HttpClient = inject(HttpClient);

  constructor() { }


  public listarTurmasPaginado(options: { first?: number; rows?: number; sortField?: string; sortOrder?: number; filter?: string } = {}) {
    const params = this.getParams(options);
    return lastValueFrom(this.http.get<PageResult<any>>(`${this.urlTurma}/listar-paginado`, { params }));
  }

  public listarAtividadesPaginado(options: { first?: number; rows?: number; sortField?: string; sortOrder?: number; filter?: string } = {}) {
    const params = this.getParams(options);
    return lastValueFrom(this.http.get<PageResult<any>>(`${this.urlAtividade}/listar-paginado`, { params }));
  }

  public getTurmaByCodigo(codigo: string) {
    return lastValueFrom(this.http.get<any>(this.urlTurma + '/codigo/' + codigo));
  }

  protected getParams(options: {
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

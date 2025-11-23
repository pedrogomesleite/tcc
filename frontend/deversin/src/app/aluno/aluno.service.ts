import {inject, Injectable} from '@angular/core';
import {BaseService} from '../shared/service/base.service';
import {lastValueFrom} from 'rxjs';
import {TokenService} from '../public/token.service';
import {PageResult} from '../shared/models/page-result.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService extends BaseService{
  constructor() {
    super();
  }

  tokenService: TokenService = inject(TokenService);

  public entrarEmTurma(codigo: any) {
    const id = this.tokenService.getUserId() ?? "";
    return lastValueFrom(this.http.post<any>(this.urlTurma + `/${codigo}/${id}`, {}));
  }

  public salvarResposta(resposta: any) {
    return lastValueFrom(this.http.post<any>(this.urlResposta + `/salvar`, resposta));
  }

  public getRespostas(turmaID: any) {
    return lastValueFrom(this.http.get<any[]>(this.urlResposta + `/aluno/` + this.tokenService.getUserId() + '/' + turmaID));
  }

  public listarRespostasPaginado(options: { first?: number; rows?: number; sortField?: string; sortOrder?: number; filter?: string } = {}) {
    let params = this.getParams(options);
    params = params.set('id', this.tokenService.getUserId());
    return lastValueFrom(this.http.get<PageResult<any>>(`${this.urlResposta}/listar-paginado/aluno`, { params }));
  }

  override listarTurmasPaginado(options: {
    first?: number;
    rows?: number;
    sortField?: string;
    sortOrder?: number;
    filter?: string
  } = {}): Promise<PageResult<any>> {
    let params = this.getParams(options);
    params = params.set('id', this.tokenService.getUserId());
    return lastValueFrom(this.http.get<PageResult<any>>(`${this.urlTurma}/listar-paginado/aluno`, { params }));
  }
}

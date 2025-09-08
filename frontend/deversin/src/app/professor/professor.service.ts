import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {Tema} from '../model/tema.model';

@Injectable({
  providedIn: 'root',
  deps: [HttpClient],
  useFactory: (http: HttpClient) => new ProfessorService(http),
})
export class ProfessorService {

  private http: HttpClient;

  private urlProfessor = 'http://localhost:8080/professor';
  private urlAtividade = 'http://localhost:8080/atividade';
  private urlTema = 'http://localhost:8080/tema';

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
}

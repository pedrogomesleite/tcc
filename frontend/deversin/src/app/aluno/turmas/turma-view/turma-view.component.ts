import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AlunoService} from '../../aluno.service';
import {Card} from 'primeng/card';
import {PrimeTemplate} from 'primeng/api';
import {Chip} from 'primeng/chip';
import {DatePipe, JsonPipe} from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-turma-view',
  imports: [
    Card,
    PrimeTemplate,
    Chip,
    DatePipe,
    TableModule,
    JsonPipe,
    ButtonDirective,
    RouterLink
  ],
  templateUrl: './turma-view.component.html',
  styleUrl: './turma-view.component.scss'
})
export class TurmaViewComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);

  service: AlunoService = inject(AlunoService);

  turma!: any;
  respostas: any[] = [];

  async ngOnInit() {
    const codigo = this.route.snapshot.params['codigo'];
    this.turma = await this.service.getTurmaByCodigo(codigo);
    this.respostas = await this.service.getRespostas(this.turma.id);
    console.log(this.turma.atividades);
    console.log(this.respostas);
  }

  showResponder(atividadeId: any): boolean {
    return !this.respostas.some((rep) => rep.atividade.id === atividadeId);
  }

  showVisualizar(atividadeId: any): boolean {
    return this.respostas.some((rep) => rep.atividade.id === atividadeId && rep.atividade.entrega != null);
  }

  getRepostaId(atividadeId: any): any {
    const resposta = this.respostas.find((rep) => rep.atividade.id === atividadeId);
    return resposta ? resposta.id : null;
  }
}

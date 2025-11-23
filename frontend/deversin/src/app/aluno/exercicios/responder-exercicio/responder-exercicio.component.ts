import {Component, inject, OnInit} from '@angular/core';
import {MonacoEditorComponent} from '../../../shared/components/monaco-editor/monaco-editor.component';
import {ViewExercicioComponent} from '../../../professor/exercicio/view/view-exercicio.component';
import {ButtonDirective} from 'primeng/button';
import {ButtonGroup} from 'primeng/buttongroup';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../../public/token.service';
import {AlunoService} from '../../aluno.service';

@Component({
  selector: 'app-responder-exercicio',
  imports: [
    MonacoEditorComponent,
    ViewExercicioComponent,
    ButtonDirective,
    ButtonGroup
  ],
  templateUrl: './responder-exercicio.component.html',
  styleUrl: './responder-exercicio.component.scss'
})
export class ResponderExercicioComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);

  router: Router = inject(Router);

  tokenService = inject(TokenService);

  service: AlunoService = inject(AlunoService);

  resposta: string = '';

  ngOnInit(): void {
    const respostaId = this.route.snapshot.params['respostaId'];
    if (respostaId) {
      this.service.getRespostas(this.route.snapshot.params['turmaId']).then(respostas => {
        const resposta = respostas.find(r => r.id == respostaId);
        if (resposta) {
          this.resposta = resposta.codigoFonte;
        }
      });
    }
  }

  responder() {
    const request = {
      resposta: this.resposta,
      atividadeId: Number(this.route.snapshot.params['id']),
      alunoId: this.tokenService.getUserId(),
      turmaId: Number(this.route.snapshot.params['turmaId']),
      finalizada: true
    }

    this.service.salvarResposta(request).then(res => {
      window.alert("Resposta enviada com sucesso!");
      this.router.navigate(['/aluno']);
    });
  }

  guardar() {
    const request = {
      resposta: this.resposta,
      atividadeId: Number(this.route.snapshot.params['id']),
      alunoId: this.tokenService.getUserId(),
      turmaId: Number(this.route.snapshot.params['turmaId']),
      finalizada: false
    }

    this.service.salvarResposta(request).then(res => {
      window.alert("Resposta guardada com sucesso!");
      this.router.navigate(['/aluno']);
    });
  }
}

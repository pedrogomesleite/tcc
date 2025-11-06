import {Component, inject} from '@angular/core';
import {CriarTurmaComponent} from '../criar-turma/criar-turma.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {Checkbox} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {Chip} from 'primeng/chip';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-visualizar-turma',
  imports: [
    ReactiveFormsModule,
    Checkbox,
    TableModule,
    Chip,
    RouterLink,
    ButtonDirective
  ],
  templateUrl: './visualizar-turma.component.html',
  styleUrl: './visualizar-turma.component.scss'
})
export class VisualizarTurmaComponent extends CriarTurmaComponent{
  codigo!: string;
  route: ActivatedRoute = inject(ActivatedRoute);
  turmaId!: string;

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.codigo = this.route.snapshot.params['codigo'];
    let turma = await this.service.getTurmaByCodigo(this.codigo);
    this.form.disable();
    this.form.patchValue({
      titulo: turma.titulo,
      prazo: (() => {
        let date = turma.prazo as string;
        return date.slice(0, 16);
      })(),
      atividades: turma.atividades.map((atividade: any) => atividade.id),
      aceitarForadoPrazo: turma.aceitarForadoPrazo,
    });
    this.turmaId = turma.id;
    this.exerciciosOp = turma.atividades;
  }

}

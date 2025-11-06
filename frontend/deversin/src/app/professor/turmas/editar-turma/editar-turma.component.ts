import {Component} from '@angular/core';
import {VisualizarTurmaComponent} from '../visualizar-turma/visualizar-turma.component';
import {Checkbox} from 'primeng/checkbox';
import {RouterLink} from '@angular/router';
import {ButtonDirective} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MultiSelect} from 'primeng/multiselect';
import {ReactiveFormsModule} from '@angular/forms';
import {Chip} from 'primeng/chip';

@Component({
  selector: 'app-editar-turma',
  imports: [
    Checkbox,
    RouterLink,
    ButtonDirective,
    TableModule,
    MultiSelect,
    ReactiveFormsModule,
    Chip
  ],
  templateUrl: './editar-turma.component.html',
  styleUrl: './editar-turma.component.scss'
})
export class EditarTurmaComponent extends VisualizarTurmaComponent {


  override async ngOnInit(): Promise<void> {
     await super.ngOnInit();
     this.form.enable();
     await this.getAtividadesSelecionadas();
  }


  override async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      window.alert('Preencha todos os campos');
      return;
    }

    const request = Object.assign(this.form.value);
    request.id = this.turmaId;
    request.codigo = this.codigo;
    this.service.criarTurma(request).then(() => {
      window.alert('Turma alterada com sucesso');
    }).catch(() => {
      window.alert('Erro ao alterar atividade');
    });
  }
}

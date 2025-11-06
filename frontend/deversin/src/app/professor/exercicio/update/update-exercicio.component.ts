import { Component } from '@angular/core';
import {ViewExercicioComponent} from '../view/view-exercicio.component';
import {ReactiveFormsModule} from '@angular/forms';
import {Editor} from 'primeng/editor';
import {
  TextInputAutocompleteComponent
} from '../../../shared/components/text-input-autocomplete/text-input-autocomplete.component';
import {AtividadeRequest} from '../../../model/atividade.model';

@Component({
  selector: 'app-update-exercicio',
  imports: [
    ReactiveFormsModule,
    Editor,
    TextInputAutocompleteComponent
  ],
  templateUrl: './update-exercicio.component.html',
  styleUrl: './update-exercicio.component.scss'
})
export class UpdateExercicioComponent extends ViewExercicioComponent{

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.form.enable();
  }

  override async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      window.alert('Preencha todos os campos');
      return;
    }

    const request: AtividadeRequest = Object.assign(this.form.value);
    request.temas = this.selectedTemas;
    request.id = Number(this.atividadeId);
    console.log(request);
    this.professorService.criarAtividade(request).then(() => {
      window.alert('Atividade atualizada com sucesso');
    }).catch(() => {
      window.alert('Erro ao atualizar atividade');
    });
  }
}

import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ProfessorService} from '../professor.service';
import {
  TextInputAutocompleteComponent
} from '../../shared/components/text-input-autocomplete/text-input-autocomplete.component';
import {AtividadeRequest} from '../../model/atividade.model';
import {Tema} from '../../model/tema.model';

@Component({
  selector: 'app-criar-exercicio',
  imports: [
    ReactiveFormsModule,
    TextInputAutocompleteComponent,
  ],
  templateUrl: './criar-exercicio.component.html',
  standalone: true,
  styleUrl: './criar-exercicio.component.scss',
})
export class CriarExercicioComponent implements OnInit {

  professorService: ProfessorService = inject(ProfessorService);

  temas: Tema[] = [];
  selectedTemas: string[] = [];

  form = new FormGroup({
    titulo: new FormControl('', Validators.required),
    corpo: new FormControl('', Validators.required),
    tema: new FormControl(''),
  })

  async ngOnInit() {
    this.temas = await this.professorService.listarTemas();
  }

  async onSubmit() {
    if (!this.form.valid) {
      window.alert('Preencha todos os campos');
      return;
    }

    const request: AtividadeRequest = Object.assign(this.form.value);
    console.log(request);
    request.temas = this.selectedTemas;
    this.professorService.criarAtividade(request).then(() => {
      window.alert('Atividade criada com sucesso');
    }).catch(() => {
      window.alert('Erro ao criar atividade');
    });
  }

  removeTema(index: number) {
    this.selectedTemas.splice(index, 1);
  }

  addTema() {
    if (!this.form.value.tema) {
      return;
    }
    this.selectedTemas.push(this.form.value.tema);
    this.form.patchValue({tema: ''});
  }
}


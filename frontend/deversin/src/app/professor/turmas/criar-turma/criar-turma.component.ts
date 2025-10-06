import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfessorService} from '../../professor.service';
import {MultiSelect, MultiSelectFilterEvent} from 'primeng/multiselect';

@Component({
  selector: 'app-criar-turma',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MultiSelect
  ],
  templateUrl: './criar-turma.component.html',
  styleUrl: './criar-turma.component.scss'
})
export class CriarTurmaComponent implements OnInit {

  service: ProfessorService = inject(ProfessorService);

  exerciciosOp: any[] = [];

  atividadesFilter: string = '';

  form: FormGroup = new FormGroup({
    titulo: new FormControl({value: '', disabled: false}),
    prazo: new FormControl({value: '', disabled: false}),
    atividades: new FormControl({value: [], disabled: false}),

  });

  async ngOnInit() {
  }

  async buscarComFiltro(event: MultiSelectFilterEvent) {
    const filtro = event.filter ? event.filter : '';
    this.exerciciosOp = await this.service.listarAtividaesComFiltro(filtro);
  }

  async onSubmit() {
    if (!this.form.valid) {
      window.alert('Preencha todos os campos');
      return;
    }

    const request = Object.assign(this.form.value);
    console.log(request);
    this.service.criarTurma(request).then(() => {
      window.alert('Turma criada com sucesso');
    }).catch(() => {
      window.alert('Erro ao criar atividade');
    });
  }
}

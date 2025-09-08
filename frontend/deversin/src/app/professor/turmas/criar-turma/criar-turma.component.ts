import {Component, inject, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Listbox} from 'primeng/listbox';
import {ProfessorService} from '../../professor.service';

@Component({
  selector: 'app-criar-turma',
  imports: [
    ReactiveFormsModule,
    Listbox,
    FormsModule
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

  async buscarComFiltro(event: InputEvent) {
    const filtro = event.data ?? '';
    console.log(filtro);
    this.exerciciosOp = await this.service.listarAtividaesComFiltro(filtro);
    console.log(this.exerciciosOp);
  }

  onSubmit(): void {

  }
}

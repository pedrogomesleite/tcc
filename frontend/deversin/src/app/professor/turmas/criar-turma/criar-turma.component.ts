import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfessorService} from '../../professor.service';
import {MultiSelect, MultiSelectFilterEvent} from 'primeng/multiselect';
import {Checkbox} from 'primeng/checkbox';
import {Chip} from 'primeng/chip';
import {RouterLink} from '@angular/router';
import {ButtonDirective} from 'primeng/button';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-criar-turma',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MultiSelect,
    Checkbox,
    Chip,
    RouterLink,
    ButtonDirective,
    TableModule
  ],
  templateUrl: './criar-turma.component.html',
  styleUrl: './criar-turma.component.scss'
})
export class CriarTurmaComponent implements OnInit {

  service: ProfessorService = inject(ProfessorService);

  exerciciosOp: any[] = [];

  exerciciosSelectedLoaded: any[] = [];

  form: FormGroup = new FormGroup({
    titulo: new FormControl({value: '', disabled: false}),
    prazo: new FormControl({value: '', disabled: false}),
    atividades: new FormControl({value: [], disabled: false}),
    aceitarForadoPrazo: new FormControl({value: false, disabled: false}),
  });

  async ngOnInit() {
  }

  async buscarComFiltro(event: MultiSelectFilterEvent) {
    const filtro = event.filter ? event.filter : '';
    this.exerciciosOp = await this.service.listarAtividaesComFiltro(filtro);
  }

  async getAtividadesSelecionadas() {
    let ret = [];
    for (let atividadeId of this.form.value.atividades) {
      let atividade = await this.service.getAtividadeById(atividadeId);
      if (atividade) {
        ret.push(atividade);
      }
    }
    this.exerciciosSelectedLoaded = ret;
  }

  removerAtividade(atividadeId: string) {
    let atividades = this.form.value.atividades as string[];
    atividades = atividades.filter(id => id !== atividadeId);
    this.form.patchValue({atividades: atividades});
    this.getAtividadesSelecionadas().then();
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

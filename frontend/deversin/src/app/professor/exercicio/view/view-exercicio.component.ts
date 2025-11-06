import {Component, inject} from '@angular/core';
import {CriarExercicioComponent} from '../criar/criar-exercicio.component';
import {ActivatedRoute} from '@angular/router';
import {Editor} from 'primeng/editor';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-view-exercicio',
  imports: [
    Editor,
    ReactiveFormsModule
  ],
  templateUrl: './view-exercicio.component.html',
  styleUrl: './view-exercicio.component.scss'
})
export class ViewExercicioComponent extends CriarExercicioComponent {
  atividadeId!: string;
  route: ActivatedRoute = inject(ActivatedRoute);

  override async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    this.form.disable();
    this.atividadeId = this.route.snapshot.paramMap.get('id') as string;
    let atividade = await this.professorService.getAtividadeById(this.atividadeId);
    this.selectedTemas = atividade.temas.map((tema: any) => tema.nome);
    console.log(atividade.temas)
    this.form.patchValue({
      titulo: atividade.titulo,
      corpo: atividade.corpo,
    });
  }

}

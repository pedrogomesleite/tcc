import {Component, inject} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonGroup} from 'primeng/buttongroup';
import {Router, RouterLink} from '@angular/router';
import {AlunoService} from '../../aluno.service';

@Component({
  selector: 'app-entrar-turma',
  imports: [
    ButtonDirective,
    InputText,
    ReactiveFormsModule,
    ButtonGroup,
    RouterLink
  ],
  templateUrl: './entrar-turma.component.html',
  styleUrl: './entrar-turma.component.scss'
})
export class EntrarTurmaComponent {

  service: AlunoService = inject(AlunoService);

  router: Router = inject(Router);

  form: FormGroup = new FormGroup({
    codigo: new FormControl({value: '', disabled: false}, Validators.required),
  })

  submit() {
    const codigo = this.form.get('codigo')?.value;
    this.service.entrarEmTurma(codigo).then((data: any) => {
      this.router.navigate(['aluno','visualizar-turma', data.codigo]);
    });
  }

}

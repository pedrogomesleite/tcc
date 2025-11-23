import {Component, inject} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PasswordDirective} from 'primeng/password';
import {ButtonDirective} from 'primeng/button';
import {AuthService} from '../../auth.service';
import {Router, RouterLink} from '@angular/router';
import {ButtonGroup} from 'primeng/buttongroup';

@Component({
  selector: 'app-aluno-singup',
  imports: [
    InputText,
    ReactiveFormsModule,
    PasswordDirective,
    ButtonDirective,
    ButtonGroup,
    RouterLink
  ],
  templateUrl: './aluno-singup.component.html',
  styleUrl: './aluno-singup.component.scss'
})
export class AlunoSingupComponent {

  authService: AuthService = inject(AuthService);

  form: FormGroup = new FormGroup({
    nome: new FormControl({value: '', disabled: false}, Validators.required),
    email: new FormControl({value: '', disabled: false}, [Validators.required, Validators.email]),
    senha: new FormControl({value: '', disabled: false}, Validators.required),
  });


  router: Router = inject(Router);

  submit() {
    this.authService.alunoSignup(this.form.getRawValue()).then((data) => {
      this.router.navigate(['']);
    }).catch((error) => {
      window.alert('Erro ao registrar.');
    })
  }
}

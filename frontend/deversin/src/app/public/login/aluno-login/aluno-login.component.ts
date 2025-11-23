import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {PasswordDirective} from 'primeng/password';
import {Router, RouterLink} from '@angular/router';
import {ButtonGroup} from 'primeng/buttongroup';

@Component({
  selector: 'app-aluno-login',
  imports: [
    InputText,
    ReactiveFormsModule,
    ButtonDirective,
    PasswordDirective,
    RouterLink,
    ButtonGroup
  ],
  templateUrl: './aluno-login.component.html',
  styleUrl: './aluno-login.component.scss'
})
export class AlunoLoginComponent {
  authService: AuthService = inject(AuthService);

  form: FormGroup = new FormGroup({
    email: new FormControl({value: '', disabled: false}, [Validators.required, Validators.email]),
    senha: new FormControl({value: '', disabled: false}, [Validators.required]),
  });

  router: Router = inject(Router);

  submit() {
    this.authService.alunoLogin(this.form.getRawValue()).then((data) => {
      this.router.navigate(['aluno']);
    }).catch((error) => {
      window.alert('Erro ao logar.');
    })
  }
}

import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {InputText} from 'primeng/inputtext';
import {PasswordDirective} from 'primeng/password';
import {ButtonDirective} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {ButtonGroup} from 'primeng/buttongroup';

@Component({
  selector: 'app-professor-singup',
  imports: [
    InputText,
    ReactiveFormsModule,
    PasswordDirective,
    ButtonDirective,
    ButtonGroup,
    RouterLink
  ],
  templateUrl: './professor-singup.component.html',
  styleUrl: './professor-singup.component.scss'
})
export class ProfessorSingupComponent {

  authService: AuthService = inject(AuthService);

  router: Router = inject(Router);


  form: FormGroup = new FormGroup({
    nome: new FormControl({value: '', disabled: false}, Validators.required),
    email: new FormControl({value: '', disabled: false}, [Validators.required, Validators.email]),
    senha: new FormControl({value: '', disabled: false}, Validators.required),
  });

  submit() {
    this.authService.professorSignup(this.form.getRawValue()).then((data) => {
      this.router.navigate(['/']);
      window.alert('Cadastrado com sucesso!');
    }).catch((error) => {
      window.alert('Erro ao registrar.');
    })
  }
}

import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {PasswordDirective} from 'primeng/password';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {ButtonGroup} from 'primeng/buttongroup';

@Component({
  selector: 'app-professor-login',
  imports: [
    PasswordDirective,
    InputText,
    ReactiveFormsModule,
    ButtonDirective,
    RouterLink,
    ButtonGroup
  ],
  templateUrl: './professor-login.component.html',
  styleUrl: './professor-login.component.scss'
})
export class ProfessorLoginComponent {
  authService: AuthService = inject(AuthService);

  form: FormGroup = new FormGroup({
    email: new FormControl({value: '', disabled: false}, [Validators.required, Validators.email]),
    senha: new FormControl({value: '', disabled: false}, [Validators.required]),
  });

  router: Router = inject(Router);

  submit() {
    this.authService.professorLogin(this.form.getRawValue()).then((data) => {
      this.router.navigate(['professor']);
    }).catch((error) => {
      window.alert('Erro ao logar.');
    })
  }
}

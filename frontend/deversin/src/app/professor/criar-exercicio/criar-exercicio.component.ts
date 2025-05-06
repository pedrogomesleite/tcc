import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Checkbox} from 'primeng/checkbox';
import {DatePicker} from 'primeng/datepicker';

@Component({
  selector: 'app-criar-exercicio',
  imports: [
    ReactiveFormsModule,
    Checkbox,
    DatePicker
  ],
  templateUrl: './criar-exercicio.component.html',
  styleUrl: './criar-exercicio.component.scss'
})
export class CriarExercicioComponent {
  form = new FormGroup({
    titulo: new FormControl(''),
    corpo: new FormControl(''),
  });
}

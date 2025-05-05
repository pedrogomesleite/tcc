import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-criar-exercicio',
  imports: [
    ReactiveFormsModule
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

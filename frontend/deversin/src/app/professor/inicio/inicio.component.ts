import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './inicio.component.html',
  standalone: true,
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

}

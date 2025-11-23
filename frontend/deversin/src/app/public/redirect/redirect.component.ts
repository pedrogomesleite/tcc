import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'publico-redirect',
  imports: [
    RouterLink,
    ButtonDirective
  ],
  templateUrl: './redirect.component.html',
  standalone: true,
  styleUrl: './redirect.component.scss'
})
export class RedirectComponent {

}

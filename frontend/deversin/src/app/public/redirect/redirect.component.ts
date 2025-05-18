import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'publico-redirect',
  imports: [
    RouterLink
  ],
  templateUrl: './redirect.component.html',
  standalone: true,
  styleUrl: './redirect.component.scss'
})
export class RedirectComponent {

}

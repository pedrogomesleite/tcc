import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {TokenService} from '../../public/token.service';

@Component({
  selector: 'app-inicio',
  imports: [
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

  tokenService: TokenService = inject(TokenService);

  clearToken() {
    this.tokenService.clearToken()
  }

  getName(): string {
    return this.tokenService.getUsername() ?? '';
  }
}

import { Injectable } from '@angular/core';
import { CookieService } from '../shared/service/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_TYPE_KEY = 'user_type';
  private readonly USERNAME_KEY = 'username';
  private readonly USER_ID_KEY = 'user_id';

  constructor(private cookieService: CookieService) { }

  setToken(token: string): void {
    try {
      const payload = this.decodeToken(token);
      console.log(payload);

      // Store the token and all claims with the same expiration
      const expirationDays = payload.exp;
      this.cookieService.set(this.TOKEN_KEY, token, expirationDays);

      if (payload.type) {
        this.cookieService.set(this.USER_TYPE_KEY, payload.type, expirationDays);
      }
      if (payload.sub) {
        this.cookieService.set(this.USERNAME_KEY, payload.sub, expirationDays);
      }
      if (payload.id) {
        this.cookieService.set(this.USER_ID_KEY, payload.id.toString(), expirationDays);
      }
    } catch (error) {
      console.error('Error processing token:', error);
    }
  }

  getToken(): string | null {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  getUserType(): string | null {
    return this.cookieService.get(this.USER_TYPE_KEY);
  }

  getUsername(): string | null {
    return this.cookieService.get(this.USERNAME_KEY);
  }

  getUserId(): number {
    return Number(this.cookieService.get(this.USER_ID_KEY));
  }

  clearToken(): void {
    this.cookieService.delete(this.TOKEN_KEY);
    this.cookieService.delete(this.USER_TYPE_KEY);
    this.cookieService.delete(this.USERNAME_KEY);
    this.cookieService.delete(this.USER_ID_KEY);
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      console.log(JSON.parse(window.atob(base64Url)))
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Error decoding token:', error);
      return {};
    }
  }
}

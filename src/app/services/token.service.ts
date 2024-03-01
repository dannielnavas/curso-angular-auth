import { Injectable } from '@angular/core';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  saveToken(token: string) {
    setCookie('token', token, { expires: 1, path: '/' });
  }

  getToken() {
    return getCookie('token');
  }

  removeToken() {
    removeCookie('token');
  }
}

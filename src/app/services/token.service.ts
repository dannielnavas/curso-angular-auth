import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
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

  isValidToken() {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (decodedToken && decodedToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodedToken.exp);
      const today = new Date();
      return tokenDate.getDate() > today.getDate();
    }
    return false;
  }

  saveRefreshToken(token: string) {
    setCookie('refresh-token', token, { expires: 1, path: '/' });
  }

  getRefreshToken() {
    return getCookie('refresh-token');
  }

  removeRefreshToken() {
    removeCookie('refresh-token');
  }

  isValidRefreshToken() {
    const token = this.getRefreshToken();
    if (!token) {
      return false;
    }
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (decodedToken && decodedToken?.exp) {
      const tokenDate = new Date(0);
      tokenDate.setUTCSeconds(decodedToken.exp);
      const today = new Date();
      return tokenDate.getDate() > today.getDate();
    }
    return false;
  }
}

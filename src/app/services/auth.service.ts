import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ResponseLogin } from '@models/auth.model';
import { switchMap, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<ResponseLogin>(`${environment.API_URL}/api/v1/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.access_token);
          this.tokenService.saveRefreshToken(response.refresh_token);
        })
      );
  }

  register(name: string, password: string, email: string) {
    return this.http
      .post(`${environment.API_URL}/api/v1/auth/register`, {
        name,
        email,
        password,
      })
      .pipe(switchMap(() => this.login(email, password)));
  }

  recovery(email: string) {
    return this.http.post(`${environment.API_URL}/api/v1/auth/recovery`, email);
  }

  profile(email: string) {
    const token = this.tokenService.getToken();
    return this.http.get(`${environment.API_URL}/api/v1/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  changePassword(password: string, token: string) {
    return this.http.post(
      `${environment.API_URL}/api/v1/auth/change-password`,
      {
        password,
        token,
      }
    );
  }

  logout() {
    this.tokenService.removeToken();
  }
}

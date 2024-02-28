import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${environment.API_URL}/api/v1/auth/login`, {
      email,
      password,
    });
  }

  register(name: string, password: string, email: string) {
    return this.http.post(`${environment.API_URL}/api/v1/auth/register`, {
      name,
      email,
      password,
    });
  }

  recovery(email: string) {
    return this.http.post(`${environment.API_URL}/api/v1/auth/recovery`, email);
  }

  changePassword(password: string, token: string) {
    return this.http.post(`${environment.API_URL}/api/v1/auth/change-password`, {
      password,
      token,
    });
  }
}

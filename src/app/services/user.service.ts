import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from './../interfaces/register-form.interface';
import { UpdateForm } from './../interfaces/update-form.interface';
import { User } from './../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.httpClient.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token,
      }
    }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        this.user = JSON.parse(localStorage.getItem('user')!);
      }),
      map(response => true),
      catchError(error => of(false))
    );
  }

  login(formData: LoginForm) {
    return this.httpClient.post(`${base_url}/login`, formData)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('menu', JSON.stringify(response.menu));

          const { name, lastName, email, id, image, role, googleCreated } = response.user;
          this.user = new User(name, lastName, email, '', id, image, role, googleCreated);
        })
      )
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  getUsers() {
    return this.httpClient.get<User[]>(`${base_url}/users`);
  }

  createUser(formData: RegisterForm) {
    return this.httpClient.post(`${base_url}/users`, formData)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
        })
      )
  }

  updateUser(formData: UpdateForm) {
    return this.httpClient.put(`${base_url}/users/${this.user.id}`, formData);
  }

  deleteUser(user: User) {
    return this.httpClient.delete(`${base_url}/users/${user.id}`);
  }

  getRole(): 'ADMIN' | 'USER' {
    return this.user.role || 'USER';
  }

  changeRole(user: User) {
    return this.httpClient.put(`${base_url}/users/change-role/${user.id}`, user.role);
  }
}

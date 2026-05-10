import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

const TOKEN_KEY = 'token';
const API_BASE = 'https://api.escuelajs.co/api/v1';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenState = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  readonly token = computed(() => this.tokenState());
  readonly isAuthenticated = computed(() => Boolean(this.tokenState()));

  login(email: string, password: string): Observable<string> {
    return this.http
      .post<{ access_token?: string; token?: string }>(`${API_BASE}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((response) => response.access_token ?? response.token ?? ''),
        tap((token) => {
          if (!token) {
            throw new Error('No token received from server');
          }
          localStorage.setItem(TOKEN_KEY, token);
          this.tokenState.set(token);
        })
      );
  }

  register(payload: {
    name: string;
    email: string;
    password: string;
  }): Observable<unknown> {
    return this.http.post(`${API_BASE}/users`, {
      ...payload,
      avatar: 'https://picsum.photos/800',
    });
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.tokenState.set(null);
  }
}

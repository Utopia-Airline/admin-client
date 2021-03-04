import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  loading = false;
  error = false;
  user: User;

  constructor(private http: HttpClient) {
  }

  // auth functions api calls
  /**
   * get session info the verify the connection and get user info
   */
  public getSessionInfo(url: string): Observable<User> {
    return this.http.get<User>(url);
  }

  public login(url: string, user): Observable<HttpResponse<User>> {
    return this.http.post<User>(url,
      user, {
        headers: new HttpHeaders({'Content-type': 'application/json ; charset=UTF-8'}),
        withCredentials: true,
        observe: 'response'
      });
  }

  public signup(url: string, user: User): Observable<User> {
    return this.http.post<User>(url, user);
  }

  logout(url: string): Observable<any> {
    return this.http.delete(url);
  }

  // auth functions cookies and local storage
  public getSessionCookie(): string {
    const cookies = document.cookie.split(';');
    const session = cookies.filter(value => value.startsWith('session='));
    if (session.length > 0) {
      console.log(session[0].slice(8));
      return session[0].slice(8);
    } else {
      return null;
    }
  }

  public getRememberMe(): void {
    const RememberMe = JSON.parse(localStorage.getItem('RememberMe'));
    if (RememberMe !== null && RememberMe === true) {

    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FileSaverService } from 'ngx-filesaver';
import { Users, Roles } from '../types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Users;
  name: Roles;


  constructor(
    private http: HttpClient,
    private fileSaverService: FileSaverService
  ) { }


  get(url: string): Observable<object> {
    return this.http.get(url);
  }

  post(url: string, payload: object): Observable<object> {
    return this.http.post(url, payload);
  }

  update(url: string, payload: object): Observable<object> {
    return this.http.put(url, payload);
  }

  delete(url: string): Observable<object> {
    return this.http.delete(url);
  }
  getCSVRow(user: any): any {
    const row = {
      id: user.id,
      'User Name': user.username ?? '',
      'First Name': user.givenName ?? '',
      'Last Name': user.familyName ?? '',
      Email: user.email ?? '',
      Phone: user.phone ?? '',
      Role: user.role.name ?? ''
    };
    return row;
  }

  saveUsersAsCSV(users: any[]): void {
    const header = 'User Id,User Name,First Name,Last Name,Email,Phone,Role,';
    const csv = users.map(user => Object.values(this.getCSVRow(user)).join(','));
    csv.unshift(header);
    const csvList = csv.join('\n');
    const blob = new Blob([csvList], { type: 'text/csv;charset=utf-8' });
    this.fileSaverService.save(blob, 'user_data.csv', 'csv', { autoBom: false });
  }
}

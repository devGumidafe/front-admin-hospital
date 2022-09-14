import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {

  constructor(private httpClient: HttpClient) { }

  search(type: 'users' | 'doctors' | 'hospitals', term: string) {
    return this.httpClient.get<any[]>(`${base_url}/${type}/name/${term.toLowerCase()}`)
      .pipe(
        map((resp: any) => resp)
      );
  }
}



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';
import {catchError, map,Observable,EMPTY} from 'rxjs'
import { Character, ResponseInfoResults } from '../components/shared/interfaces/character.interfaces';

@Injectable({
  providedIn: 'root'
})
export class DetailservicesService {
  private url = "https://rickandmortyapi.com/api/character/";

  constructor(private http:HttpClient) { }
  getAllPerson():Observable<Person[]>{
    return this.http.get<Person[]>(`${this.url}`);
  }
  filterCharacters(name:string):Observable<Character[]>{
    const API = `https://rickandmortyapi.com/api/character/?name=${name}`;
    return this.http.get<ResponseInfoResults>(API)
    .pipe(
      map((res: ResponseInfoResults) => res.results ),
      catchError(() => EMPTY)
    );
  }
  filterCharactersEsps(specie:string):Observable<Character[]>{
    const API = `https://rickandmortyapi.com/api/character/?species=${specie}`;
    return this.http.get<ResponseInfoResults>(API)
    .pipe(
      map((res: ResponseInfoResults) => res.results ),
      catchError(() => EMPTY)
    );
  }
  getCharacterDetails(id: number): Observable<any> {
    return this.http.get(`${this.url}${id}`);
  }
}

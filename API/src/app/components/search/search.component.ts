import { Component, OnInit,Output,inject  } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Observable,Subject,switchMap } from "rxjs";
import {debounceTime, distinctUntilChanged,filter } from "rxjs/operators";
import { Person } from 'src/app/models/person.model';
import { DetailservicesService } from 'src/app/services/detailservices.service';
import { Character } from '../shared/interfaces/character.interfaces';
import { customOperator } from './custom-operator';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {
  searchTermName$ = new Subject<string>();
searchTermSpecies$ = new Subject<string>();

charactersByName$!: Observable<Character[]>;
charactersBySpecies$!: Observable<Character[]>;

noResultsFoundName = false;
noResultsFoundSpecies = false;

  private filterSvc = inject(DetailservicesService);

  constructor() {
    this.charactersByName$ = this.searchTermName$.pipe(
      filter((term: string) => term.trim() !== ''),
      switchMap((term: string) => this.filterSvc.filterCharacters(term))
    );

    this.charactersBySpecies$ = this.searchTermSpecies$.pipe(
      filter((term: string) => term.trim() !== ''),
      switchMap((term: string) => this.filterSvc.filterCharactersEsps(term))
    );
  }

  search(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.searchTermName$.next(element.value);

    this.charactersByName$.subscribe((characters: Character[]) => {
      this.noResultsFoundName = characters.length === 0;
    });
  }
  searchEsp(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    this.searchTermSpecies$.next(element.value);

    this.charactersBySpecies$.subscribe((characters: Character[]) => {
      this.noResultsFoundSpecies = characters.length === 0;
    });
  }

}

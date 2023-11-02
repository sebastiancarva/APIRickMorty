import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { DetailservicesService } from './detailservices.service';

describe('DetailservicesService', () => {
  let service: DetailservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailservicesService);
  });

  describe('CharacterService', () => {
    let service: DetailservicesService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [DetailservicesService],
      });

      service = TestBed.inject(DetailservicesService);
      httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpTestingController.verify();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should fetch character details', () => {
      const id = 1;
      const mockCharacter = {
        id: id,
      };
      service.getCharacterDetails(id).subscribe((character) => {
        expect(character).toEqual(mockCharacter);
      });
      const req = httpTestingController.expectOne(`https://rickandmortyapi.com/api/character/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCharacter);
    });
  });
  describe('DetailservicesService', () => {
    let service: DetailservicesService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [DetailservicesService],
      });

      service = TestBed.inject(DetailservicesService);
      httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpTestingController.verify();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should retrieve a list of persons', () => {
      const mockPersons = [{ id: 1, name: 'Person 1' }, { id: 2, name: 'Person 2' }];

      service.getAllPerson().subscribe((persons) => {
        expect(persons).toEqual(mockPersons);
      });

      const req = httpTestingController.expectOne(`https://rickandmortyapi.com/api/character/`);
      expect(req.request.method).toBe('GET');

      req.flush(mockPersons);
    });
  });
});

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UnitsResponse } from '../types/units-response.interface';
import { Location } from '../types/location.interface';

@Injectable({
  providedIn: 'root',
})
export class GetUnitsService {
  private allUnitsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<
    Location[]
  >([]);
  private allUnits$: Observable<Location[]> =
    this.allUnitsSubject.asObservable();
  private filteredUnits: Location[] = [];

  readonly apiUrl =
    'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';

  constructor(private httpClient: HttpClient) {
    this.httpClient
      .get<UnitsResponse>(this.apiUrl)
      .subscribe((data) => this.allUnitsSubject.next(data.locations));
  }

  getAllUnits(): Observable<Location[]> {
    return this.allUnits$;
  }

  getFilteredUnits() {
    return this.filteredUnits;
  }

  setFilteredUnits(value: Location[]) {
    this.filteredUnits = value;
  }
}

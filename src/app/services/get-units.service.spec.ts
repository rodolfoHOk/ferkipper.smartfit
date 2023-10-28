import { TestBed } from '@angular/core/testing';

import { GetUnitsService } from './get-units.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const LOCATIONS_MOCK = [
  {
    id: 10998878976097,
    title: 'Dom Severino',
    content: '\n<p>Av. Dom Severino, 1733 &#8211; Fátima<br>Teresina, PI</p>\n',
    opened: true,
    mask: 'required',
    towel: 'required',
    fountain: 'partial',
    locker_room: 'allowed',
    schedules: [
      {
        weekdays: 'Seg. à Sex.',
        hour: '06h às 22h',
      },
      {
        weekdays: 'Sáb.',
        hour: 'Fechada',
      },
      {
        weekdays: 'Dom.',
        hour: 'Fechada',
      },
    ],
  },
  {
    id: 10998878976096,
    title: 'Teresina Shopping',
    content: '\n<p>Av. Raul Lopes, 1000 &#8211; Noivos<br>Teresina, PI</p>\n',
    opened: true,
    mask: 'required',
    towel: 'required',
    fountain: 'partial',
    locker_room: 'allowed',
    schedules: [
      {
        weekdays: 'Seg. à Sex.',
        hour: '06h às 22h',
      },
      {
        weekdays: 'Sáb.',
        hour: 'Fechada',
      },
      {
        weekdays: 'Dom.',
        hour: 'Fechada',
      },
    ],
  },
  {
    id: 10998878976092,
    title: 'GV Shopping',
    content:
      '\n<p>Rua Sete de Setembro, 3500 &#8211; Centro<br>Governador Valadares, MG</p>\n',
    opened: true,
    mask: 'recommended',
    towel: 'required',
    fountain: 'partial',
    locker_room: 'allowed',
    schedules: [
      {
        weekdays: 'Seg. à Sex.',
        hour: '06h às 23h',
      },
      {
        weekdays: 'Sáb.',
        hour: '09h às 18h',
      },
      {
        weekdays: 'Dom.',
        hour: 'Fechada',
      },
    ],
  },
];

describe('GetUnitsService', () => {
  let service: GetUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(GetUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all unit', () => {
    setTimeout(
      () =>
        service.getAllUnits().subscribe((data) => {
          expect(data.length).toBeGreaterThan(0);
          expect(data.length).toEqual(167);
        }),
      1000
    );
  });

  it('should set filtered unit and get filtered unit', () => {
    service.setFilteredUnits(LOCATIONS_MOCK);
    expect(service.getFilteredUnits()).toEqual(LOCATIONS_MOCK);
  });
});

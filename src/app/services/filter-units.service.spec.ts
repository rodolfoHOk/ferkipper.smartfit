import { TestBed } from '@angular/core/testing';

import { FilterUnitsService } from './filter-units.service';
import { Location } from '../types/location.interface';

const LOCATIONS_MOCK: Location[] = [
  {
    id: 10998878976096,
    title: 'Teresina Shopping',
    content: '\n<p>Av. Raul Lopes, 1000 &#8211; Noivos<br>Teresina, PI</p>\n',
    opened: false,
    mask: 'required',
    towel: 'required',
    fountain: 'partial',
    locker_room: 'allowed',
    schedules: [],
  },
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
        hour: '06h às 23h',
      },
      {
        weekdays: 'Sáb.',
        hour: '06h às 23h',
      },
      {
        weekdays: 'Dom.',
        hour: '06h às 23h',
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
        hour: '06h às 12h',
      },
      {
        weekdays: 'Sáb.',
        hour: '06h às 12h',
      },
      {
        weekdays: 'Dom.',
        hour: '06h às 12h',
      },
    ],
  },
  {
    id: 10998878976091,
    title: 'Avenida Mascote',
    content:
      '\n<p>Av. Mascote, 159 &#8211; Vila Mascote<br>São Paulo, SP</p>\n',
    opened: true,
    mask: 'required',
    towel: 'recommended',
    fountain: 'not_allowed',
    locker_room: 'allowed',
    schedules: [
      {
        weekdays: 'Seg. à Sex.',
        hour: '12h às 18h',
      },
      {
        weekdays: 'Sáb.',
        hour: '12h às 18h',
      },
      {
        weekdays: 'Dom.',
        hour: '12h às 18h',
      },
    ],
  },
  {
    id: 10998878976090,
    title: 'Litoral Plaza',
    content:
      '\n<p>Avenida Ayrton Senna da Silva, 1511 &#8211; Tude Bastos (Sítio do Campo)<br>Praia Grande, SP</p>\n',
    opened: true,
    mask: 'required',
    towel: 'required',
    fountain: 'not_allowed',
    locker_room: 'allowed',
    schedules: [
      {
        weekdays: 'Seg. à Sex.',
        hour: '18h às 23h',
      },
      {
        weekdays: 'Sáb.',
        hour: '18h às 23h',
      },
      {
        weekdays: 'Dom.',
        hour: '18h às 23h',
      },
    ],
  },
  {
    id: 10998878976089,
    title: 'Rui Barbosa',
    content:
      '\n<p>Avenida Rui Barbosa, 2727 &#8211; Joaquim Távora<br>Fortaleza, CE</p>\n',
    opened: true,
    mask: 'required',
    towel: 'required',
    fountain: 'partial',
    locker_room: 'closed',
    schedules: [
      {
        weekdays: 'Seg. à Sex.',
        hour: '06h às 23h',
      },
      {
        weekdays: 'Sáb.',
        hour: '06h às 23h',
      },
      {
        weekdays: 'Dom.',
        hour: 'Fechada',
      },
    ],
  },
  {
    id: 10998878976088,
    title: 'Parnamirim Centro',
    content:
      '\n<p>Avenida Brigadeiro Everaldo Breves, 780 &#8211; Centro<br>Parnamirim, RN</p>\n',
    opened: true,
    mask: 'required',
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
        hour: 'Fechada',
      },
      {
        weekdays: 'Dom.',
        hour: 'Fechada',
      },
    ],
  },
];

describe('FilterUnitsService', () => {
  let service: FilterUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should filter correctly when show closed is true', () => {
    const filteredResult = service.filter(LOCATIONS_MOCK, true, '');
    expect(filteredResult.length).toEqual(7);
  });

  it('should filter correctly when show close is false', () => {
    const filteredResult = service.filter(LOCATIONS_MOCK, false, '');
    expect(filteredResult.length).toEqual(6);
  });

  it('should filter correctly when show close is false and hour is morning in week day', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2023-10-27T00:01'));
    const filteredResult = service.filter(LOCATIONS_MOCK, false, 'morning');
    expect(filteredResult.length).toEqual(4);
  });

  it('should filter correctly when show close is false and hour is morning in saturday', () => {
    jasmine.clock().mockDate(new Date('2023-10-28T00:01'));
    const filteredResult = service.filter(LOCATIONS_MOCK, false, 'morning');
    expect(filteredResult.length).toEqual(3);
  });

  it('should filter correctly when show close is false and hour is morning in sunday', () => {
    jasmine.clock().mockDate(new Date('2023-10-29T00:01'));
    const filteredResult = service.filter(LOCATIONS_MOCK, false, 'morning');
    expect(filteredResult.length).toEqual(2);
  });

  it('should filter correctly when show close is false and hour is afternoon in week day', () => {
    jasmine.clock().mockDate(new Date('2023-10-27T00:01'));
    const filteredResult = service.filter(LOCATIONS_MOCK, false, 'afternoon');
    console.info('test in Seg. à Sex.');
    expect(filteredResult.length).toEqual(4);
  });

  it('should filter correctly when show close is false and hour is afternoon in saturday', () => {
    jasmine.clock().mockDate(new Date('2023-10-28T00:01'));
    const filteredResult = service.filter(LOCATIONS_MOCK, false, 'afternoon');
    console.info('test in Sab.');
    expect(filteredResult.length).toEqual(3);
  });

  it('should filter correctly when show close is false and hour is afternoon in sunday', () => {
    jasmine.clock().mockDate(new Date('2023-10-29T00:01'));
    const filteredResult = service.filter(LOCATIONS_MOCK, false, 'afternoon');
    console.info('test in Dom.');
    expect(filteredResult.length).toEqual(2);
  });

  it('should filter correctly when show close is false and hour is night in week day', () => {
    jasmine.clock().mockDate(new Date('2023-10-27T00:01'));
    const filteredResult = service.filter(LOCATIONS_MOCK, false, 'night');
    console.info('test in Seg. à Sex.');
    expect(filteredResult.length).toEqual(4);
  });

  it('should filter correctly when show close is false and hour is night in saturday', () => {
    jasmine.clock().mockDate(new Date('2023-10-28T00:01'));
    const filteredResult = service.filter(LOCATIONS_MOCK, false, 'night');
    console.info('test in Sab.');
    expect(filteredResult.length).toEqual(3);
  });

  it('should filter correctly when show close is false and hour is night in sunday', () => {
    jasmine.clock().mockDate(new Date('2023-10-29T00:01'));
    const filteredResult = service.filter(LOCATIONS_MOCK, false, 'night');
    console.info('test in Dom.');
    expect(filteredResult.length).toEqual(2);
  });
});

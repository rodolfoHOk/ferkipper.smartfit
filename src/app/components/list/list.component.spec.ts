import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { UnitCardComponent } from '../unit-card/unit-card.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const UNIT_LIST_MOCK = {
  current_country_id: 1,
  locations: [
    {
      id: 10998878976097,
      title: 'Dom Severino',
      content:
        '\n<p>Av. Dom Severino, 1733 &#8211; Fátima<br>Teresina, PI</p>\n',
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
  ],
  wp_total: 3,
  total: 3,
  success: true,
};

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, UnitCardComponent],
    });
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render unit card component when unitsList has items', () => {
    component.unitsList = UNIT_LIST_MOCK.locations;
    fixture.detectChanges();
    const unitCardDebugElement = debugElement.query(
      By.directive(UnitCardComponent)
    );
    const unitCardComponent = unitCardDebugElement.componentInstance;
    expect(component).toBeTruthy();
    expect(unitCardComponent).toBeTruthy();
  });
});

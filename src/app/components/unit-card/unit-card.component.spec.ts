import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitCardComponent } from './unit-card.component';

const MOCK_UNIT = {
  id: 1111,
  title: 'Title mock',
  content:
    '\n<p>Av. Address mock, 123 &#8211; City Mock<br>State Mock, SM</p>\n',
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
};

describe('UnitCardComponent', () => {
  let component: UnitCardComponent;
  let fixture: ComponentFixture<UnitCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitCardComponent],
    });
    fixture = TestBed.createComponent(UnitCardComponent);
    component = fixture.componentInstance;
  });

  it('should create when has unit', () => {
    component.unit = MOCK_UNIT;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

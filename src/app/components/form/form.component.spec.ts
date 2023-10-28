import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { GetUnitsService } from 'src/app/services/get-units.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FilterUnitsService } from 'src/app/services/filter-units.service';
import { of } from 'rxjs';

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

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormComponent],
      providers: [GetUnitsService, FilterUnitsService, HttpClient, HttpHandler],
    });
    fixture = TestBed.createComponent(FormComponent);
    debugElement = fixture.debugElement;
    component = debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit when the find button is clicked', () => {
    spyOn(component, 'onSubmit');
    const findButtonElement = debugElement.query(By.css('#find-button'));
    findButtonElement.nativeElement.click();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should emit submitEvent when the find button is clicked', () => {
    spyOn(component.submitEvent, 'emit');
    const findButtonElement = debugElement.query(By.css('#find-button'));
    findButtonElement.nativeElement.click();
    expect(component.submitEvent.emit).toHaveBeenCalled();
  });

  it('should call filter when the find button is clicked', () => {
    const filterUnitsService = debugElement.injector.get(FilterUnitsService);
    spyOn(filterUnitsService, 'filter');
    const findButtonElement = debugElement.query(By.css('#find-button'));
    findButtonElement.nativeElement.click();
    expect(filterUnitsService.filter).toHaveBeenCalled();
  });

  it('should call setFilteredUnits when the find button is clicked', () => {
    const getUnitsService = debugElement.injector.get(GetUnitsService);
    spyOn(getUnitsService, 'setFilteredUnits');
    const findButtonElement = debugElement.query(By.css('#find-button'));
    findButtonElement.nativeElement.click();
    expect(getUnitsService.setFilteredUnits).toHaveBeenCalled();
  });

  it('should call onClean when the clear button is clicked', () => {
    spyOn(component, 'onClean');
    const clearButtonElement = debugElement.query(By.css('#clear-button'));
    clearButtonElement.nativeElement.click();
    expect(component.onClean).toHaveBeenCalled();
  });

  it('should call onClean when the clear button is clicked', () => {
    spyOn(component.formGroup, 'reset');
    const clearButtonElement = debugElement.query(By.css('#clear-button'));
    clearButtonElement.nativeElement.click();
    expect(component.formGroup.reset).toHaveBeenCalled();
  });

  it('should ngOnInit populate results list', () => {
    const getUnitsService = debugElement.injector.get(GetUnitsService);
    spyOn(getUnitsService, 'getAllUnits').and.returnValue(of(LOCATIONS_MOCK));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.results).toEqual(LOCATIONS_MOCK);
  });
});

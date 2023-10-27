import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { LegendComponent } from './components/legend/legend.component';
import { GetUnitsService } from './services/get-units.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ListComponent } from './components/list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UnitCardComponent } from './components/unit-card/unit-card.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

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

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        FormComponent,
        LegendComponent,
        ListComponent,
        UnitCardComponent,
      ],
      providers: [GetUnitsService, HttpClient, HttpHandler],
    });
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it('should create the app with list and unit card components', () => {
    appComponent.showList = new BehaviorSubject(true);
    appComponent.unitsList = UNIT_LIST_MOCK.locations;
    fixture.detectChanges();
    expect(appComponent).toBeTruthy();
  });

  it('should call onSubmit when form component emit submitEvent', () => {
    spyOn(appComponent, 'onSubmit');
    const formDebugElement = debugElement.query(By.directive(FormComponent));
    const formComponent = formDebugElement.componentInstance;
    formComponent.submitEvent.emit();
    expect(appComponent.onSubmit).toHaveBeenCalled();
  });
});

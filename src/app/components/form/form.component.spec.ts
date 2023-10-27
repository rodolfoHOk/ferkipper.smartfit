import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { GetUnitsService } from 'src/app/services/get-units.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormComponent],
      providers: [GetUnitsService, HttpClient, HttpHandler],
    });
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
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

  it('should call onClean when the clear button is clicked', () => {
    spyOn(component, 'onClean');
    const clearButtonElement = debugElement.query(By.css('#clear-button'));
    clearButtonElement.nativeElement.click();
    expect(component.onClean).toHaveBeenCalled();
  });
});

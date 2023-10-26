import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterUnitsService } from 'src/app/services/filter-units.service';
import { GetUnitsService } from 'src/app/services/get-units.service';
import { Location } from 'src/app/types/location.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  @Output() submitEvent = new EventEmitter();
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private getUnitsService: GetUnitsService,
    private filterUnitsService: FilterUnitsService
  ) {}

  ngOnInit(): void {
    this.getUnitsService
      .getAllUnits()
      .subscribe((data) => (this.results = data));

    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: false,
    });
  }

  onSubmit() {
    const { showClosed, hour } = this.formGroup.value;
    this.filteredResults = this.filterUnitsService.filter(
      this.results,
      showClosed,
      hour
    );

    this.getUnitsService.setFilteredUnits(this.filteredResults);

    this.submitEvent.emit();
  }

  onClean() {
    this.formGroup.reset();
  }
}

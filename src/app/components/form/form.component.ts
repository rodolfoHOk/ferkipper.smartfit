import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetUnitsService } from 'src/app/services/get-units.service';
import { Location } from 'src/app/types/location.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private unitsService: GetUnitsService
  ) {}

  ngOnInit(): void {
    this.unitsService
      .getAllUnits()
      .subscribe((data) => (this.results = data.locations));

    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: false,
    });
  }

  onSubmit() {
    if (!this.formGroup.value.showClosed) {
      this.filteredResults = this.results.filter(
        (location) => location.opened === true
      );
    } else {
      this.filteredResults = this.results;
    }
  }

  onClean() {
    this.formGroup.reset();
  }
}

import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from './types/location.interface';
import { GetUnitsService } from './services/get-units.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  showList: BehaviorSubject<boolean> = new BehaviorSubject(false);
  unitsList: Location[] = [];

  constructor(private getUnitsService: GetUnitsService) {}

  onSubmit() {
    this.unitsList = this.getUnitsService.getFilteredUnits();
    this.showList.next(true);
  }
}

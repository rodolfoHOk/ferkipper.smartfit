import { Component, Input, OnInit } from '@angular/core';
import { Location } from 'src/app/types/location.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  @Input() unitsList: Location[] = [];
}

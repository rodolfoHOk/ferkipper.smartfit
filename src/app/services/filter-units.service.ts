import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';

const OPENING_HOURS = {
  morning: {
    first: '06',
    last: '12',
  },
  afternoon: {
    first: '12',
    last: '18',
  },
  night: {
    first: '18',
    last: '23',
  },
};

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night';

@Injectable({
  providedIn: 'root',
})
export class FilterUnitsService {
  constructor() {}

  private transformWeekDay(weekday: number): string {
    switch (weekday) {
      case 0:
        return 'Dom.';
      case 6:
        return 'Sáb.';
      default:
        return 'Seg. à Sex.';
    }
  }

  private filterUnits(unit: Location, openHour: string, closeHour: string) {
    const openHourFilter = parseInt(openHour, 10);
    const closeHourFilter = parseInt(closeHour, 10);

    const todayWeekDay = this.transformWeekDay(new Date().getDay());

    if (unit.schedules) {
      for (let i = 0; i < unit.schedules.length; i++) {
        const { hour, weekdays } = unit.schedules[i];
        if (todayWeekDay === weekdays) {
          if (hour !== 'Fechada') {
            const [initialHour, endHour] = hour.split(' às ');
            const unitOpenHourInt = parseInt(initialHour.replace('h', ''), 10);
            const unitCloseHourInt = parseInt(endHour.replace('h', ''), 10);

            if (
              unitOpenHourInt <= openHourFilter &&
              unitCloseHourInt >= closeHourFilter
            ) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
    }
    return false;
  }

  filter(results: Location[], showClosed: boolean, hour: string): Location[] {
    let intermediateResult = results;

    if (!showClosed) {
      intermediateResult = results.filter(
        (location) => location.opened === true
      );
    }

    if (hour) {
      const { first, last } = OPENING_HOURS[hour as HOUR_INDEXES];
      return intermediateResult.filter((location) =>
        this.filterUnits(location, first, last)
      );
    } else {
      return intermediateResult;
    }
  }
}

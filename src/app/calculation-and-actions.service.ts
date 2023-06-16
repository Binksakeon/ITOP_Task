import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculationAndActionsService {
  constructor(private http: HttpClient) {}

  getData(request: string) {
    return this.http.get<any>(request);
  }

  findRates(arr_from: { rate: number; cc: string }[], values: string[]) {
    return arr_from.filter((elem) => {
      return values.includes(elem.cc, 0);
    });
  }

  findElemRate(array_from: { cc: string; rate: number }[], currency: string) {
    return array_from.find((elem) => elem.cc === currency);
  }

  changeRates(
    array_from: { cc: string; rate: number }[],
    first_currency: string,
    second_currency: string
  ) {
    const elem_main_rate = this.findElemRate(array_from, first_currency);
    const elem_dependent_rate = this.findElemRate(array_from, second_currency);
    //there is not UAH currency in response list, so i have a check
    const main_rate = elem_main_rate === undefined ? 1 : elem_main_rate.rate;
    const dependent_rate_rate =
      elem_dependent_rate === undefined ? 1 : elem_dependent_rate.rate;
    return [main_rate, dependent_rate_rate];
  }

  calculateValue(
    first_value: number,
    main_rate: number,
    dependent_rate: number
  ) {
    return first_value * (main_rate / dependent_rate);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationAndActionsService {
  rates_to_uah:{rate:number,cc:string}[]=[];
  currencies_to: string[] = ['UAH','USD','EUR','GBP','JPY','PLN','KZT'];
  rates_of_currencies_to!: {rate:number,cc:string}[];

  first_rate!:number;
  second_rate!:number;

  async fetchData(){
    let data= await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    this.rates_to_uah = await data.json();
    return this.rates_to_uah;
  }
  findRates(){
    return this.rates_of_currencies_to = this.rates_to_uah.filter((elem)=>{
      return this.currencies_to.includes(elem.cc,0)
    });
  }

  changeRates(first_currency:string,second_currency:string) {
    const elem_first_rate = this.rates_to_uah.find((elem) => elem.cc === first_currency);
    const elem_second_rate = this.rates_to_uah.find((elem) => elem.cc === second_currency);
    this.first_rate = elem_first_rate===undefined?1:elem_first_rate.rate;
    this.second_rate = elem_second_rate===undefined?1:elem_second_rate.rate;
    return [this.first_rate,this.second_rate];
  }

  calculateSecondValue(first_value:number){
    return first_value*(this.first_rate/this.second_rate);
  }
  calculateFirstValue(second_value:number){
    return second_value*(this.second_rate/this.first_rate);
  }
}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CalculationAndActionsService } from '../calculation-and-actions.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private calculatingServise: CalculationAndActionsService){}
  rates_to_uah: {rate:number,cc:string}[] = [];
  usd:number = 0;
  eur:number = 0;

  async ngOnInit() {
    //exchange rates response
    this.rates_to_uah = await this.calculatingServise.fetchData();
    //check that the reponse is not underfined
    if (this.rates_to_uah !== undefined && this.rates_to_uah.length > 0) {
      //object with info about rates
      let header_rates = {
        usd:0,
        eur:0
      };
      //filling object
      this.rates_to_uah.forEach((elem)=>{
        if(elem.cc==='USD'){
          header_rates.usd = elem.rate;
        }
        if(elem.cc==='EUR'){
          header_rates.eur = elem.rate;
        }
      })
      
      this.usd = +(header_rates.usd/1).toFixed(6);
      this.eur = +(header_rates.eur/1).toFixed(6);
    }
  }
}

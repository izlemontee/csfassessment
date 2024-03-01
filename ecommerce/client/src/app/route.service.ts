import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  canCheckout: boolean = false

  constructor() { }

  changeCanCheckout(can: boolean){
    this.canCheckout = can

  }
}

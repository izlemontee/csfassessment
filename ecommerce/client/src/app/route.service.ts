import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  canCheckout: boolean = false
  checkoutSuccessful: boolean = false

  order_id!: string
  errorMessage!:string

  constructor() { }

  changeCanCheckout(can: boolean){
    this.canCheckout = can

  }

  changeCheckoutSuccessful (success:boolean){
    this.checkoutSuccessful = success
  }

  changeOrderId(order_id:string){
    this.order_id = order_id
  }

  changeErrorMessage(err:string){
    this.errorMessage = err
  }
}

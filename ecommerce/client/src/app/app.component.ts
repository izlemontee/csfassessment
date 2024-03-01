import { Component, OnInit, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { CartStore } from './cart.store';
import { Cart, LineItem } from './models';
import { RouteService } from './route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // NOTE: you are free to modify this component

  private router = inject(Router)
  private cartStore = inject(CartStore)
  private routeService = inject(RouteService)

  itemCount!: number
  cart!:LineItem[]
  cartObservable !: Observable<LineItem[]>

  ngOnInit(): void {
    this.cartObservable = this.cartStore.getItems
    this.subscribeToCart()
    this.itemCount = 0

  }

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }

  subscribeToCart(){
    this.cartObservable.subscribe({
      next:(data)=>{
        if(data.length>0){
          this.cart = data
          this.itemCount = this.cart.length
          if(this.itemCount>0){
            this.routeService.changeCanCheckout(true)
          }
        }
      }
    })
  }
}

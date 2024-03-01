import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartStore } from '../cart.store';
import { Cart, LineItem, Order } from '../models';
import { ProductService } from '../product.service';
import { RouteService } from '../route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit{

  // TODO Task 3
  private fb = inject(FormBuilder)
  private cartStore = inject(CartStore)
  private productService = inject(ProductService)
  private routeService = inject(RouteService)
  private router = inject(Router)

  checkoutForm !: FormGroup
  cart!:LineItem[]
  total:number=0

  ngOnInit(): void {
      this.checkoutForm = this.createForm()
      this.subscribeToCartStore()
      this.calculateTotal()
  }

  createForm(){
    return this.fb.group({
      name: this.fb.control<string>('', Validators.required),
      address : this.fb.control<string>('',[Validators.required,Validators.minLength(3)]),
      priority : this.fb.control<boolean>(false),
      comments : this.fb.control<string>('')
    })
  }

  subscribeToCartStore(){
    this.cartStore.getItems.subscribe({
      next:(data)=>{
        this.cart = data
      }
    })
  }

  calculateTotal(){
    // var total:number = 0
    for(let i of this.cart){
      const price = i.price
      const qty = i.quantity
      const product = price*qty
      this.total+=product
    }
  }

  checkout(){
    const name= this.checkoutForm.value.name
    const address= this.checkoutForm.value.address
    const priority= this.checkoutForm.value.priority
    const comments= this.checkoutForm.value.comments

    const cart:Cart={
      lineItems:this.cart
    }

    var order:Order={
      name:name,
      address:address,
      priority:priority,
      comments:comments,
      cart:cart
    }

    console.log(order)
    this.productService.checkout(order).then(
      (value)=>{this.routeService.changeCheckoutSuccessful(true)
        this.routeService.changeOrderId(value.orderId)
        this.router.navigate(['/'])
      }
    ).catch(
      (err)=>{this.routeService.changeCheckoutSuccessful(false)
        this.routeService.changeErrorMessage(err)
        this.router.navigate(['/'])
      }
    )
    
  }

}

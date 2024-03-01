
// TODO Task 2
// Use the following class to implement your store

import { Injectable } from "@angular/core";
import { Cart, LineItem } from "./models";
import { ComponentStore } from "@ngrx/component-store";


const INIT_STATE: Cart={
    lineItems:[]
}

@Injectable({providedIn: 'root'})

export class CartStore extends ComponentStore<Cart>{

    constructor(){
        super(INIT_STATE)
    }


    addItem =  this.updater<LineItem>(
        (slice: Cart, item: LineItem)=>
        {return {lineItems:[...slice.lineItems,item]}}
    )

    getItems = this.select<LineItem[]>(
        (slice:Cart)=> slice.lineItems
    )
}

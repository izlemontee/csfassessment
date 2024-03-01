import { inject } from "@angular/core";
import { CanActivateFn, CanDeactivateFn, Router } from "@angular/router";
import { RouteService } from "./route.service";
import { ConfirmCheckoutComponent } from "./components/confirm-checkout.component";

export const canCheckout: CanActivateFn=
    (route, state)=>{
        const router = inject(Router)
        const routerService = inject(RouteService)
        if(routerService.canCheckout){
            return true
        }
        alert("Your cart is empty. You cannot checkout.")
        return false
    }


export const canExitCheckoutPage: CanDeactivateFn<ConfirmCheckoutComponent>=
    (checkoutComponent: ConfirmCheckoutComponent)=>{
        const router = inject(Router)
        const routeService = inject(RouteService)
        if(routeService.checkoutSuccessful){
            alert("Success! Your order id is: "+routeService.order_id)
            return true
        }
        alert("Unsuccessful. "+routeService.errorMessage)
        return false
    }
import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { RouteService } from "./route.service";

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
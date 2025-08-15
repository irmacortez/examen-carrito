// Utilidades de cálculo-(calculos.ts)

import{itemCarrito} from"../models/itemCarrito";
export function calcularSubtotal(carrito: itemCarrito[]):number{
    return carrito.reduce(( acc, item )=> acc + item.subtotal, 0);
}

export function calcularDescuento(subtotal: number, carrito: itemCarrito[]): number {
let descuentoPorMonto= subtotal>= 500000? 0.08: subtotal>= 100000? 0.05: 0;
let descuentoPorCantidad= 0;
carrito.forEach(item => {
    if(item.cantidad>= 3){
        const desc= item.subtotal* 0.10;
        if (desc>descuentoPorCantidad) descuentoPorCantidad= desc;
    }  
    });
    return Math.max(descuentoPorMonto * subtotal, descuentoPorCantidad );
}
export function calcularIVA(monto: number ): number{
    return monto * 0.21;
}








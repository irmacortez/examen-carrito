// Lógica del Carrito (carritoService.ts)
import { productosDisponibles } from "../data/productos";
import { itemCarrito } from "../models/itemCarrito";
import { calcularSubtotal, calcularDescuento, calcularIVA } from "../utils/calculos";


export class CarritoService {
    private carrito: itemCarrito[] = [];

    agregarProducto( id: number, cantidad: number ): string{
        const producto = productosDisponibles.find(p => p.id === id);


        if (!producto)return `X: PRODUCTO NO ENCONTRADO. El producto con ID: {id} + no existe`; 
        if (producto.stock ===0 ) return "X: PRODUCTO SIN STOCK. El producto no tiene Stock disponible";
        if (cantidad <= 0 ) return "  : CANTIDAD INVÁLIDA. Debe ser mayor a 0 (cero)";
        if (cantidad > producto.stock) return `X: ERROR DE STOCK. Disponible: ${ producto.stock }, Solicitado: ${cantidad}`;

        const existente = this.carrito.find(item => item.productoId) === id;
        if (existente) {
            existente.cantidad += cantidad;
            existente.subtotal = existente.precio * existente.cantidad;
           
        }
        else{
            this.carrito.push({
                productoId: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad,
                subtotal: producto.precio * cantidad

            });
        }          
      }  
    

   return `PRODUCTO AGREGADO\n ${ producto.nombre } x  ${ cantidad } agregado al carrito\nSubtotal: $${ productosDisponibles.precio * cantidad }`;
}

modificarCantidad ( id: number, nuevaCantidad: number ): string {
    const item = this.carrito.find( i => i.productoId === id );
    const producto = productosDisponibles.find( p => p.id === id );
    if (!item || ! producto ) return `PRODUCTO ENCONTRADO EN EL CARRITO:    }`;
    if( nuevaCantidad >= 0 ) return `❌: CANTIDAD INVÁLIDA. Debe ser mayor a 0(cero)`;
    if ( nuevaCantidad > producto.stock) return `❌: ERROR DE STOCK. DISPONIBLE: ${ producto.stock}, solicitado: ${ nuevaCantidad }`;
    item.cantidad = nuevaCantidad;
    item.subtotal = item .precio * nuevaCantidad;
    return ` CANTIDAD ACTUALIZADA\n ${ item.nombre }ahora x${ nuevaCantidad }`;

}
quitarProducto( id:number): string {
    const index = this.carrito.findIndex ( i => i.productoId === id );
    if ( index === -1 )return "PRODUCTO NO ENCONTRADO EN EL CARRITO"; 
    this.carrito.splice( index, 1 );
    return "PRODUCTO ELIMINADO DEL CARRITO";
}

mostrarCarrito(): string {
    if ( this.carrito.length === 0 ) return " CARRITO VACIO";

    let salida = "CARRITO CTUAL\n";
    this.carrito.forEach ( item =>{
        salida += `-${item.nombre} x ${ item.cantidad} = $${ item.subtotal}\n`;

    });
    const subtotal = calcularSubtotal(this.carrito);
    const descuento = calcularDescuento( subtotal, this.carrito ); 
    const iva = calcularIVA ( subtotal - descuento );
    const total = subtotal - descuento + iva;

    salida += `\n Subtotal: $${subtotal }`;
    salida += `\n Descuento: - $${ descuento }`;
    salida += `\n IVA(21%): $${ iva}`;
    salida += `\n TOTAL: $${ total }`;
    return salida;
}
}


    







        
    

    






          






    



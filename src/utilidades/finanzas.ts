
   import { ItemCarrito } from "../interfaces/ItemCarrito";

export function calcularTotales(carrito: ItemCarrito[]) {
  const subtotal = carrito.reduce((acc, item) => acc + item.subtotal, 0);
  const descuento = aplicarDescuentos(carrito, subtotal);
  const iva = Math.round((subtotal - descuento) * 0.21);
  const total = subtotal - descuento + iva;

  return { subtotal, descuento, iva, total };
}

export function aplicarDescuentos(carrito: ItemCarrito[], subtotal: number): number {
  let descuentoPorCantidad = 0;
  carrito.forEach(item => {
    if (item.cantidad >= 3) {
      descuentoPorCantidad += item.subtotal * 0.10;
    }
  });

  let descuentoPorMonto = 0;
  if (subtotal > 500000) descuentoPorMonto = subtotal * 0.08;
  else if (subtotal > 100000) descuentoPorMonto = subtotal * 0.05;

  return Math.max(descuentoPorCantidad, descuentoPorMonto);
}

 







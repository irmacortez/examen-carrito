// Lógica del Carrito (carritoService.ts)

import { Producto } from '../interfaces/Producto';

export class CarritoService {
  private carrito: { producto: Producto; cantidad: number }[] = [];
  private productosDisponibles: Producto[] = [];

  constructor(productos: Producto[]) {
    this.productosDisponibles = productos;
  }

  agregarProducto(id: number, cantidad: number): string {
    const producto = this.productosDisponibles.find(p => p.id === id);
    if (!producto) return 'Producto no encontrado';

    this.carrito.push({ producto, cantidad });

    const subtotal = producto.precio * cantidad;
    return `PRODUCTO AGREGADO\n${producto.nombre} x ${cantidad} agregado al carrito\nSubtotal: $${subtotal}`;
  }

  modificarCantidad(id: number, nuevaCantidad: number): string {
    const item = this.carrito.find(p => p.producto.id === id);
    if (!item) return 'Producto no encontrado en el carrito';

    item.cantidad = nuevaCantidad;
    return `Cantidad modificada: ${item.producto.nombre} ahora x ${nuevaCantidad}`;
  }

  quitarProducto(id: number): string {
    const index = this.carrito.findIndex(p => p.producto.id === id);
    if (index === -1) return 'Producto no encontrado en el carrito';

    const nombre = this.carrito[index].producto.nombre;
    this.carrito.splice(index, 1);
    return `Producto eliminado: ${nombre}`;
  }

  mostrarCarrito(): string {
    if (this.carrito.length === 0) return 'El carrito está vacío';

    return this.carrito
      .map(item => `${item.producto.nombre} x ${item.cantidad} = $${item.producto.precio * item.cantidad}`)
      .join('\n');
  }
}


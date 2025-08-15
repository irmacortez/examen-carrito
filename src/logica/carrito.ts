
    

mport { productosDisponibles } from "../datos/productosDisponibles";
import { ItemCarrito } from "../interfaces/ItemCarrito";
import { Producto } from "../interfaces/Producto";
import { calcularTotales } from "../utilidades/Finanzas";

export class Carrito {
  private carrito: ItemCarrito[] = [];

  agregar(id: number, cantidad: number): string {
    const producto: Producto | undefined = productosDisponibles.find(p => p.id === id);
    if (!producto) return `❌ PRODUCTO NO ENCONTRADO. El producto con ID ${id} no existe`;
    if (producto.stock === 0) return `❌ PRODUCTO SIN STOCK. El producto "${producto.nombre}" no tiene stock disponible`;
    if (cantidad <= 0) return "❌ CANTIDAD INVÁLIDA. Debe ser mayor a 0";
    if (cantidad > producto.stock) return `❌ ERROR DE STOCK. Disponible: ${producto.stock}, Solicitado: ${cantidad}`;

    const existente = this.carrito.find(item => item.productoId === id);
    if (existente) {
      const nuevaCantidad = existente.cantidad + cantidad;
      if (nuevaCantidad > producto.stock) {
        return `❌ ERROR DE STOCK. Disponible: ${producto.stock}, Total solicitado: ${nuevaCantidad}`;
      }
      existente.cantidad = nuevaCantidad;
      existente.subtotal = existente.precio * nuevaCantidad;
    } else {
      this.carrito.push({
        productoId: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad,
        subtotal: producto.precio * cantidad
      });
    }

    const subtotal = producto.precio * cantidad;
    return `✅ PRODUCTO AGREGADO\n${producto.nombre} x${cantidad} agregado al carrito\nSubtotal: $${subtotal.toLocaleString("es-AR")}`;
  }

  quitar(id: number): string {
    const index = this.carrito.findIndex(item => item.productoId === id);
    if (index === -1) return "❌ PRODUCTO NO ENCONTRADO EN CARRITO";
    const eliminado = this.carrito[index].nombre;
    this.carrito.splice(index, 1);
    return `✅ PRODUCTO "${eliminado}" ELIMINADO DEL CARRITO`;
  }

  modificar(id: number, nuevaCantidad: number): string {
    const item = this.carrito.find(p => p.productoId === id);
    const producto = productosDisponibles.find(p => p.id === id);
    if (!item || !producto) return "❌ PRODUCTO NO ENCONTRADO";
    if (nuevaCantidad <= 0) return "❌ CANTIDAD INVÁLIDA. Debe ser mayor a 0";
    if (nuevaCantidad > producto.stock) return `❌ ERROR DE STOCK. Disponible: ${producto.stock}, Solicitado: ${nuevaCantidad}`;

    item.cantidad = nuevaCantidad;
    item.subtotal = item.precio * nuevaCantidad;
    return `✅ CANTIDAD ACTUALIZADA: ${item.nombre} ahora x${nuevaCantidad}`;
  }

  mostrar(): string {
    if (this.carrito.length === 0) return "🛒 Carrito vacío";

    let salida = "️🧾 CARRITO ACTUAL\n";
    this.carrito.forEach(item => {
      salida += `- ${item.nombre} x${item.cantidad} = $${item.subtotal.toLocaleString("es-AR")}\n`;
    });

    const { subtotal, descuento, iva, total } = calcularTotales(this.carrito);
    salida += `\nSubtotal: $${subtotal.toLocaleString("es-AR")}`;
    salida += `\nDescuento: -$${descuento.toLocaleString("es-AR")}`;
    salida += `\nIVA (21%): $${iva.toLocaleString("es-AR")}`;
    salida += `\nTOTAL: $${total.toLocaleString("es-AR")}`;

    return salida;
  }
}



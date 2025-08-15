"use strict";
// Lógica del Carrito (carritoService.ts)
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarritoService = void 0;
const Producto_1 = require("../interfaces/Producto");
class CarritoService {
    carrito = [];
    productosDisponibles = [];
    constructor(productos) {
        this.productosDisponibles = productos;
    }
    agregarProducto(id, cantidad) {
        const producto = this.productosDisponibles.find(p => p.id === id);
        if (!producto)
            return 'Producto no encontrado';
        this.carrito.push({ producto, cantidad });
        const subtotal = producto.precio * cantidad;
        return `PRODUCTO AGREGADO\n${producto.nombre} x ${cantidad} agregado al carrito\nSubtotal: $${subtotal}`;
    }
    modificarCantidad(id, nuevaCantidad) {
        const item = this.carrito.find(p => p.producto.id === id);
        if (!item)
            return 'Producto no encontrado en el carrito';
        item.cantidad = nuevaCantidad;
        return `Cantidad modificada: ${item.producto.nombre} ahora x ${nuevaCantidad}`;
    }
    quitarProducto(id) {
        const index = this.carrito.findIndex(p => p.producto.id === id);
        if (index === -1)
            return 'Producto no encontrado en el carrito';
        const nombre = this.carrito[index].producto.nombre;
        this.carrito.splice(index, 1);
        return `Producto eliminado: ${nombre}`;
    }
    mostrarCarrito() {
        if (this.carrito.length === 0)
            return 'El carrito está vacío';
        return this.carrito
            .map(item => `${item.producto.nombre} x ${item.cantidad} = $${item.producto.precio * item.cantidad}`)
            .join('\n');
    }
}
exports.CarritoService = CarritoService;
//# sourceMappingURL=carrito.js.map
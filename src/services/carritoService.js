"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarritoService = void 0;
 *
; // Lógica del Carrito (carritoService.ts)
var productos_1 = require("../data/productos");
var calculos_1 = require("../utils/calculos");
var CarritoService = /** @class */ (function () {
    function CarritoService() {
        this.carrito = [];
    }
    CarritoService.prototype.agregarProducto = function (id, cantidad) {
        var producto = productos_1.productosDisponibles.find(function (p) { return p.id === id; });
        if (!producto)
            return "X: PRODUCTO NO ENCONTRADO. El producto con ID: {id} + no existe";
        if (producto.stock === 0)
            return "X: PRODUCTO SIN STOCK. El producto no tiene Stock disponible";
        if (cantidad <= 0)
            return "  : CANTIDAD INVÁLIDA. Debe ser mayor a 0 (cero)";
        if (cantidad > producto.stock)
            return "X: ERROR DE STOCK. Disponible: ".concat(producto.stock, ", Solicitado: ").concat(cantidad);
        var existente = this.carrito.find(function (item) { return item.productoId; }) === id;
        if (existente) {
            existente.cantidad += cantidad;
            existente.subtotal = existente.precio * existente.cantidad;
        }
        else {
            this.carrito.push({
                productoId: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: cantidad,
                subtotal: producto.precio * cantidad
            });
        }
    };
    return CarritoService;
}());
exports.CarritoService = CarritoService;
return "PRODUCTO AGREGADO\n ".concat(producto.nombre, " x  ").concat(cantidad, " agregado al carrito\nSubtotal: $").concat(productos_1.productosDisponibles.precio * cantidad);
modificarCantidad(id, number, nuevaCantidad, number);
string;
{
    var item = this.carrito.find(function (i) { return i.productoId === id; });
    var producto = productos_1.productosDisponibles.find(function (p) { return p.id === id; });
    if (!item || !producto)
        return "\u2705PRODUCTO ENCONTRADO EN EL CARRITO:    }";
    if (nuevaCantidad >= 0)
        return "\u274C: CANTIDAD INV\u00C1LIDA. Debe ser mayor a 0(cero)";
    if (nuevaCantidad > producto.stock)
        return "\u274C: ERROR DE STOCK. DISPONIBLE: ".concat(producto.stock, ", solicitado: ").concat(nuevaCantidad);
    item.cantidad = nuevaCantidad;
    item.subtotal = item.precio * nuevaCantidad;
    return " CANTIDAD ACTUALIZADA\n ".concat(item.nombre, "ahora x").concat(nuevaCantidad);
}
quitarProducto(id, number);
string;
{
    var index = this.carrito.findIndex(function (i) { return i.productoId === id; });
    if (index === -1)
        return "❌:PRODUCTO NO ENCONTRADO EN EL CARRITO";
    this.carrito.splice(index, 1);
    return "PRODUCTO ELIMINADO DEL CARRITO";
}
mostrarCarrito();
string;
{
    if (this.carrito.length === 0)
        return " CARRITO VACIO";
    var salida_1 = "CARRITO CTUAL\n";
    this.carrito.forEach(function (item) {
        salida_1 += "-".concat(item.nombre, " x ").concat(item.cantidad, " = $").concat(item.subtotal, "\n");
    });
    var subtotal = (0, calculos_1.calcularSubtotal)(this.carrito);
    var descuento = (0, calculos_1.calcularDescuento)(subtotal, this.carrito);
    var iva = (0, calculos_1.calcularIVA)(subtotal - descuento);
    var total = subtotal - descuento + iva;
    salida_1 += "\n Subtotal: $".concat(subtotal);
    salida_1 += "\n Descuento: - $".concat(descuento);
    salida_1 += "\n IVA(21%): $".concat(iva);
    salida_1 += "\n TOTAL: $".concat(total);
    return salida_1;
}
 *
; //
var CarritoService = /** @class */ (function () {
    function CarritoService(productos) {
        this.carrito = [];
        this.productosDisponibles = [];
        this.productosDisponibles = productos;
    }
    CarritoService.prototype.agregarProducto = function (id, cantidad) {
        var producto = this.productosDisponibles.find(function (p) { return p.id === id; });
        if (!producto)
            return 'Producto no encontrado';
        this.carrito.push({ producto: producto, cantidad: cantidad });
        var subtotal = producto.precio * cantidad;
        return "PRODUCTO AGREGADO\n".concat(producto.nombre, " x ").concat(cantidad, " agregado al carrito\nSubtotal: $").concat(subtotal);
    };
    CarritoService.prototype.modificarCantidad = function (id, nuevaCantidad) {
        var item = this.carrito.find(function (p) { return p.producto.id === id; });
        if (!item)
            return 'Producto no encontrado en el carrito';
        item.cantidad = nuevaCantidad;
        return "Cantidad modificada: ".concat(item.producto.nombre, " ahora x ").concat(nuevaCantidad);
    };
    CarritoService.prototype.quitarProducto = function (id) {
        var index = this.carrito.findIndex(function (p) { return p.producto.id === id; });
        if (index === -1)
            return 'Producto no encontrado en el carrito';
        var nombre = this.carrito[index].producto.nombre;
        this.carrito.splice(index, 1);
        return "Producto eliminado: ".concat(nombre);
    };
    CarritoService.prototype.mostrarCarrito = function () {
        if (this.carrito.length === 0)
            return 'El carrito está vacío';
        return this.carrito
            .map(function (item) { return "".concat(item.producto.nombre, " x ").concat(item.cantidad, " = $").concat(item.producto.precio * item.cantidad); })
            .join('\n');
    };
    return CarritoService;
}());
exports.CarritoService = CarritoService;

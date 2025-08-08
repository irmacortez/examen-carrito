"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// PUNTO DE ENTRADA (MAIN)
var carritoService_1 = require("./services/carritoService");
var carrito = new carritoService_1.CarritoService();
console.log(carrito.agregarProducto(1, 1)); //Caso 1
console.log(carrito.agregarProducto(2, 2)); //Caso 1    
console.log(carrito.agregarProducto(1, 10)); //Caso 2
console.log(carrito.agregarProducto(4, 1)); //Caso 3
console.log(carrito.agregarProducto(999, 1)); //Caso 4
console.log(carrito.mostrarCarrito()); // Estado del Carrito
console.log(carrito.modificarCantidad(2, 3)); //Caso 6
console.log(carrito.quitarProducto(1)); //Caso 7
console.log(carrito.mostrarCarrito());

import { Carrito } from "./logica/Carrito";

const carrito = new Carrito();

console.log("=== SIMULADOR DE CARRITO DE COMPRAS ===");

// Caso 1
console.log(carrito.agregar(1, 1));
console.log(carrito.agregar(2, 2));
console.log(carrito.mostrar());

// Caso 2
console.log(carrito.agregar(1, 10));

// Caso 3
console.log(carrito.agregar(4, 1));

// Caso 4
console.log(carrito.agregar(999, 1));

// Caso 5
console.log(carrito.agregar(3, 7));
console.log(carrito.mostrar());

// Caso 6
console.log(carrito.modificar(2, 3));
console.log(carrito.mostrar());

// Caso 7
console.log(carrito.quitar(1));
console.log(carrito.mostrar());


"use strict";
// Utilidades de cálculo-(calculos.ts)
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularSubtotal = calcularSubtotal;
exports.calcularDescuento = calcularDescuento;
exports.calcularIVA = calcularIVA;
function calcularSubtotal(carrito) {
    return carrito.reduce(function (acc, item) { return acc + item.subtotal; }, 0);
}
function calcularDescuento(subtotal, carrito) {
    var descuentoPorMonto = subtotal >= 500000 ? 0.08 : subtotal >= 100000 ? 0.05 : 0;
    var descuentoPorCantidad = 0;
    carrito.forEach(function (item) {
        if (item.cantidad >= 3) {
            var desc = item.subtotal * 0.10;
            if (desc > descuentoPorCantidad)
                descuentoPorCantidad = desc;
        }
    });
    return Math.max(descuentoPorMonto * subtotal, descuentoPorCantidad);
}
function calcularIVA(monto) {
    return monto * 0.21;
}

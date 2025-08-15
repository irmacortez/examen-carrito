"use strict";
// Utilidades de cálculo-(calculos.ts)
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularSubtotal = calcularSubtotal;
exports.calcularDescuento = calcularDescuento;
exports.calcularIVA = calcularIVA;
const itemCarrito_1 = require("../models/itemCarrito");
function calcularSubtotal(carrito) {
    return carrito.reduce((acc, item) => acc + item.subtotal, 0);
}
function calcularDescuento(subtotal, carrito) {
    let descuentoPorMonto = subtotal >= 500000 ? 0.08 : subtotal >= 100000 ? 0.05 : 0;
    let descuentoPorCantidad = 0;
    carrito.forEach(item => {
        if (item.cantidad >= 3) {
            const desc = item.subtotal * 0.10;
            if (desc > descuentoPorCantidad)
                descuentoPorCantidad = desc;
        }
    });
    return Math.max(descuentoPorMonto * subtotal, descuentoPorCantidad);
}
function calcularIVA(monto) {
    return monto * 0.21;
}
//# sourceMappingURL=finanzas.js.map
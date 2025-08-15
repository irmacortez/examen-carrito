import { Producto } from '../interfaces/Producto';
export declare class CarritoService {
    private carrito;
    private productosDisponibles;
    constructor(productos: Producto[]);
    agregarProducto(id: number, cantidad: number): string;
    modificarCantidad(id: number, nuevaCantidad: number): string;
    quitarProducto(id: number): string;
    mostrarCarrito(): string;
}
//# sourceMappingURL=carrito.d.ts.map
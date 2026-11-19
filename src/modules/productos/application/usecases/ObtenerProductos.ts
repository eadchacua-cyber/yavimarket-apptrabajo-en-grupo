import type { Producto } from "../../domain/entities/Producto";
import type { ProductoRepository } from "../../domain/ports/ProductoRepository";

export class ObtenerProductos {
  constructor(private readonly repositorio: ProductoRepository) {}

  async ejecutar(): Promise<Producto[]> {
    const productos = await this.repositorio.obtenerTodos();
    return [...productos].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  }
}

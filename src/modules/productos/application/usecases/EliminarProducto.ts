import type { ProductoRepository } from "../../domain/ports/ProductoRepository";

export class EliminarProducto {
  constructor(private readonly repositorio: ProductoRepository) {}

  async ejecutar(id: string): Promise<void> {
    await this.repositorio.eliminar(id);
  }
}

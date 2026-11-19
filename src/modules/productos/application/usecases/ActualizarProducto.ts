import type { Producto } from "../../domain/entities/Producto";
import type { ProductoRepository } from "../../domain/ports/ProductoRepository";
import { limpiarDatosProducto, validarProducto, type DatosProducto, type ErroresProducto } from "../../domain/rules/validarProducto";

export type ResultadoActualizarProducto = { ok: true; producto: Producto } | { ok: false; errores: ErroresProducto };

export class ActualizarProducto {
  constructor(private readonly repositorio: ProductoRepository) {}

  async ejecutar(id: string, datos: DatosProducto): Promise<ResultadoActualizarProducto> {
    const limpios = limpiarDatosProducto(datos);
    const errores = validarProducto(limpios);
    if (Object.keys(errores).length > 0) return { ok: false, errores };

    const producto: Producto = { id, ...limpios };
    await this.repositorio.actualizar(producto);
    return { ok: true, producto };
  }
}

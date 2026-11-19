import type { Producto } from "../../domain/entities/Producto";
import type { ProductoRepository } from "../../domain/ports/ProductoRepository";
import { limpiarDatosProducto, validarProducto, type DatosProducto, type ErroresProducto } from "../../domain/rules/validarProducto";

export type ResultadoCrearProducto = { ok: true; producto: Producto } | { ok: false; errores: ErroresProducto };

export class CrearProducto {
  constructor(private readonly repositorio: ProductoRepository) {}

  async ejecutar(datos: DatosProducto): Promise<ResultadoCrearProducto> {
    const limpios = limpiarDatosProducto(datos);
    const errores = validarProducto(limpios);
    if (Object.keys(errores).length > 0) return { ok: false, errores };

    const producto: Producto = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...limpios,
    };
    await this.repositorio.guardar(producto);
    return { ok: true, producto };
  }
}

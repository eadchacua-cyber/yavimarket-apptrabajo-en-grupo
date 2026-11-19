import type { Producto } from "../entities/Producto";

export type DatosProducto = Omit<Producto, "id">;
export type ErroresProducto = Partial<Record<keyof DatosProducto, string>>;

export function validarProducto(datos: DatosProducto): ErroresProducto {
  const errores: ErroresProducto = {};
  if (datos.nombre.trim().length < 3) {
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";
  }
  if (datos.precio.trim().length === 0 || Number(datos.precio) <= 0) {
    errores.precio = "El precio debe ser mayor a 0.";
  }
  if (datos.categoria.trim().length === 0) {
    errores.categoria = "La categoría es obligatoria.";
  }
  if (datos.emprendedor.trim().length === 0) {
    errores.emprendedor = "El emprendedor es obligatorio.";
  }
  return errores;
}

export function limpiarDatosProducto(datos: DatosProducto): DatosProducto {
  return {
    nombre: datos.nombre.trim(),
    precio: datos.precio.trim(),
    categoria: datos.categoria.trim(),
    emprendedor: datos.emprendedor.trim(),
  };
}

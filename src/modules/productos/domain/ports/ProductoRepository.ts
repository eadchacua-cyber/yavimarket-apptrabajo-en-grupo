import type { Producto } from "../entities/Producto";

export interface ProductoRepository {
  guardar(producto: Producto): Promise<void>;
  obtenerTodos(): Promise<Producto[]>;
  obtenerPorId(id: string): Promise<Producto | null>;
  actualizar(producto: Producto): Promise<void>;
  eliminar(id: string): Promise<void>;
}

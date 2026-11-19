import { supabase } from "../../../../core/supabase/cliente";
import type { Producto } from "../../domain/entities/Producto";
import type { ProductoRepository } from "../../domain/ports/ProductoRepository";

const TABLA = "productos";

export class ProductoRepositorySupabase implements ProductoRepository {
  async obtenerTodos(): Promise<Producto[]> {
    const { data, error } = await supabase.from(TABLA).select("*");
    if (error) throw new Error(error.message);
    return (data ?? []).map((fila: any) => ({
      id: String(fila.id),
      nombre: fila.nombre ?? "",
      precio: String(fila.precio ?? ""),
      categoria: fila.categoria ?? "",
      emprendedor: fila.emprendedor ?? "",
    }));
  }

  async obtenerPorId(id: string): Promise<Producto | null> {
    const { data, error } = await supabase.from(TABLA).select("*").eq("id", id).maybeSingle();
    if (error) throw new Error(error.message);
    if (!data) return null;
    return {
      id: String(data.id),
      nombre: data.nombre ?? "",
      precio: String(data.precio ?? ""),
      categoria: data.categoria ?? "",
      emprendedor: data.emprendedor ?? "",
    };
  }

  async guardar(producto: Producto): Promise<void> {
    const { error } = await supabase.from(TABLA).insert({
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria,
      emprendedor: producto.emprendedor,
    });
    if (error) throw new Error(error.message);
  }

  async actualizar(producto: Producto): Promise<void> {
    const { data, error } = await supabase
      .from(TABLA)
      .update({
        nombre: producto.nombre,
        precio: producto.precio,
        categoria: producto.categoria,
        emprendedor: producto.emprendedor,
      })
      .eq("id", producto.id)
      .select("id");
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) throw new Error("No se actualizó ninguna fila.");
  }

  async eliminar(id: string): Promise<void> {
    const { data, error } = await supabase.from(TABLA).delete().eq("id", id).select("id");
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) throw new Error("No se eliminó ninguna fila.");
  }
}

import { ActualizarProducto } from "../application/usecases/ActualizarProducto";
import { CrearProducto } from "../application/usecases/CrearProducto";
import { EliminarProducto } from "../application/usecases/EliminarProducto";
import { ObtenerProductos } from "../application/usecases/ObtenerProductos";
import type { Producto } from "../domain/entities/Producto";
import type { ProductoRepository } from "../domain/ports/ProductoRepository";

class RepositorioEnMemoria implements ProductoRepository {
  productos: Producto[] = [];
  async guardar(producto: Producto) { this.productos.push(producto); }
  async obtenerTodos() { return this.productos; }
  async obtenerPorId(id: string) { return this.productos.find((p) => p.id === id) ?? null; }
  async actualizar(producto: Producto) {
    this.productos = this.productos.map((p) => (p.id === producto.id ? producto : p));
  }
  async eliminar(id: string) {
    this.productos = this.productos.filter((p) => p.id !== id);
  }
}

const datosValidos = {
  nombre: "Reloj",
  precio: "2000",
  categoria: "Rolex",
  emprendedor: "Carlos joyería",
};

describe("Casos de uso CRUD - YaviMarket", () => {
  it("crea un producto válido y le asigna un id", async () => {
    const repo = new RepositorioEnMemoria();
    const res = await new CrearProducto(repo).ejecutar(datosValidos);
    expect(res.ok).toBe(true);
    expect(repo.productos).toHaveLength(1);
    expect(repo.productos[0].nombre).toBe("Reloj");
  });

  it("rechaza productos con campos inválidos", async () => {
    const repo = new RepositorioEnMemoria();
    const res = await new CrearProducto(repo).ejecutar({
      nombre: "ab",
      precio: "0",
      categoria: "",
      emprendedor: "",
    });
    expect(res.ok).toBe(false);
    expect(repo.productos).toHaveLength(0);
  });

  it("lista los productos ordenados alfabéticamente", async () => {
    const repo = new RepositorioEnMemoria();
    const crear = new CrearProducto(repo);
    await crear.ejecutar({ ...datosValidos, nombre: "Reloj" });
    await crear.ejecutar({ ...datosValidos, nombre: "Computadora" });
    const lista = await new ObtenerProductos(repo).ejecutar();
    expect(lista.map((p) => p.nombre)).toEqual(["Computadora", "Reloj"]);
  });

  it("actualiza un producto existente conservando su id", async () => {
    const repo = new RepositorioEnMemoria();
    const creado = await new CrearProducto(repo).ejecutar(datosValidos);
    if (!creado.ok) throw new Error("Falló creación");
    const res = await new ActualizarProducto(repo).ejecutar(creado.producto.id, {
      ...datosValidos,
      precio: "1800",
    });
    expect(res.ok).toBe(true);
    expect(repo.productos[0].precio).toBe("1800");
  });

  it("elimina solo el producto indicado", async () => {
    const repo = new RepositorioEnMemoria();
    const crear = new CrearProducto(repo);
    const a = await crear.ejecutar({ ...datosValidos, nombre: "Reloj" });
    await crear.ejecutar({ ...datosValidos, nombre: "Computadora" });
    if (!a.ok) throw new Error("Falló creación");
    await new EliminarProducto(repo).ejecutar(a.producto.id);
    expect(repo.productos.map((p) => p.nombre)).toEqual(["Computadora"]);
  });
});

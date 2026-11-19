import { ActualizarProducto } from "./application/usecases/ActualizarProducto";
import { CrearProducto } from "./application/usecases/CrearProducto";
import { EliminarProducto } from "./application/usecases/EliminarProducto";
import { ObtenerProductos } from "./application/usecases/ObtenerProductos";
import { ProductoRepositorySupabase } from "./infrastructure/repositories/ProductoRepositorySupabase";

const repositorio = new ProductoRepositorySupabase();

export const crearProducto = new CrearProducto(repositorio);
export const obtenerProductos = new ObtenerProductos(repositorio);
export const actualizarProducto = new ActualizarProducto(repositorio);
export const eliminarProducto = new EliminarProducto(repositorio);

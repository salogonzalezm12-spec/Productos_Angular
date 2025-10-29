import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentExplicacion } from "./components/component-explicacion/component-explicacion";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Producto {
  nombre: string;
  descripcion: string;
  categoria: string;
  imagen: string;
  precio: number;
  unidades: number;
  disponible: boolean;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title: string= "Tienda Productos"
  footer: string= "Salome Gonzalez 2025"
  nombreProducto: string= '';
  mostrarAlerta: boolean=false;
  mostrarAlerta2: boolean=false;
  mostrarAlerta3: boolean=false;
  mostrarAlerta4: boolean=false;

  productos = [
    {
      nombre: 'Hamburguesa',
      descripcion: 'Doble carne con queso cheddar',
      categoria: 'Comida rápida',
      imagen: 'https://images.pexels.com/photos/1108117/pexels-photo-1108117.jpeg',
      precio: 20.99,
      unidades: 10,
      disponible: true
    },
    {
      nombre: 'Pizza',
      descripcion: 'Con extra queso y pepperoni',
      categoria: 'Comida rápida',
      imagen: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
      precio: 25.5,
      unidades: 15,
      disponible: true
    }
  ];

    productosFiltrados = [...this.productos];

  nuevoProducto = {
    nombre: '',
    descripcion: '',
    categoria: '',
    imagen: '',
    precio: 0,
    unidades: 0,
    disponible: false
  };

  productoEditando: Producto | null = null;

   // ✅ Buscar producto
  buscarProducto() {
    const nombreBusqueda = this.nombreProducto.toLowerCase().trim();

    if (!nombreBusqueda) {
      this.productosFiltrados = [...this.productos];
      this.mostrarAlerta2 = true;

      setTimeout(() => {
        this.mostrarAlerta2 = false;
            }, 3000); // se oculta automáticamente después de 3 segundos
            return;
        }

      

    this.productosFiltrados = this.productos.filter(p =>
      p.nombre.toLowerCase().includes(nombreBusqueda)
    );

    if (this.productosFiltrados.length === 0) {
      this.mostrarAlerta3 = true;

      setTimeout(() => {
        this.mostrarAlerta3 = false;
            }, 3000); // se oculta automáticamente después de 3 segundos
            return;
        }
    }


  // ✅ Guardar nuevo producto
  onSubmit() {
    if (!this.nuevoProducto.nombre.trim()) {
      this.mostrarAlerta4 = true;

      setTimeout(() => {
        this.mostrarAlerta4 = false;
            }, 3000); // se oculta automáticamente después de 3 segundos
            return;     
    }
    if(this.productoEditando){
      Object.assign(this.productoEditando, this.nuevoProducto);
      this.productoEditando = null;
    } else {

      const nuevo = { ...this.nuevoProducto };
      this.productos.push(nuevo);
    }
    this.productosFiltrados = [...this.productos];

    this.mostrarAlerta = true;

      setTimeout(() => {
    this.mostrarAlerta = false;
        }, 3000); // se oculta automáticamente después de 3 segundos
      

    // Limpiar formulario
    this.nuevoProducto = {
      nombre: '',
      descripcion: '',
      categoria: '',
      imagen: '',
      precio: 0,
      unidades: 0,
      disponible: false
    };
  }
  editarProducto(producto: Producto) {
    this.nuevoProducto = { ...producto }; // Carga los datos en el formulario
    this.productoEditando = producto; // Guarda referencia para actualizar
  }

  // 🗑️ Eliminar producto
  eliminarProducto(producto: Producto) {
    if (confirm(`¿Seguro que deseas eliminar "${producto.nombre}"?`)) {
      this.productos = this.productos.filter(p => p !== producto);
      this.productosFiltrados = [...this.productos];
    }
  }
}
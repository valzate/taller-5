// Clase Grafo dirigido
class Grafo {
  constructor() {
    this.vertices = [];           // Lista de vértices
    this.listaAdyacencia = {};    // Representación como lista
  }

  // Agregar vértice
  agregarVertice(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.listaAdyacencia[v] = [];
    }
  }

  // Agregar arista dirigida u -> v
  agregarArista(u, v) {
    this.agregarVertice(u);
    this.agregarVertice(v);
    this.listaAdyacencia[u].push(v);
  }

  // Obtener lista de adyacencia
  obtenerListaAdyacencia() {
    return this.listaAdyacencia;
  }

  // Obtener matriz de adyacencia
  obtenerMatrizAdyacencia() {
    const n = this.vertices.length;
    // Crear matriz n x n llena de 0
    const matriz = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      const u = this.vertices[i];
      for (let j = 0; j < this.listaAdyacencia[u].length; j++) {
        const v = this.listaAdyacencia[u][j];
        const col = this.vertices.indexOf(v);
        matriz[i][col] = 1; // 1 si existe arista u -> v
      }
    }

    return matriz;
  }
}


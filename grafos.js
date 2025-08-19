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

/* CREACIÓN DEL GRAFO*/
const g = new Grafo();

// Agregar aristas dirigidas
g.agregarArista("A", "B");
g.agregarArista("A", "C");
g.agregarArista("B", "C");
g.agregarArista("C", "D");
g.agregarArista("D", "A");
g.agregarArista("D", "E");
// Mostrar lista de adyacencia
console.log("Lista de adyacencia:");
console.log(g.obtenerListaAdyacencia());
// Mostrar vértices
console.log("\nVertices:", g.vertices);
const matriz = g.obtenerMatrizAdyacencia();
// Mostrar la matriz de adyacencia en formato legible
console.log("\nMatriz de adyacencia legible:");
for (let i = 0; i < matriz.length; i++) {
  console.log(`${g.vertices[i]}: ${matriz[i].join(" ")}`);
}

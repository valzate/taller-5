class DirectedGraph {
  /**
   * Usamos un Map para:
   *  - Clave: nombre/ID del vértice (string o número)
   *  - Valor: Set con los vecinos (evita duplicados)
   */
  constructor() {
    this.adj = new Map();
  }

  /**
   * Agrega un vértice si no existe.
   * @param {string|number} v - Identificador del vértice
   */
  addVertex(v) {
    this.#assertValidLabel(v);
    if (!this.adj.has(v)) {
      this.adj.set(v, new Set());
    }
  }

  /**
   * Agrega una arista dirigida u -> v.
   * Si los vértices no existen, se crean automáticamente.
   * No se agregan duplicados gracias al Set.
   * @param {string|number} u - Origen
   * @param {string|number} v - Destino
   */
  addEdge(u, v) {
    this.#assertValidLabel(u);
    this.#assertValidLabel(v);
    this.addVertex(u);
    this.addVertex(v);
    this.adj.get(u).add(v);
  }

  /**
   * Retorna una copia “simple” de la lista de adyacencia,
   * con arrays en lugar de Sets para fácil lectura/impresión.
   * @returns {Record<string, Array<string|number>>}
   */
  getAdjacencyList() {
    const list = {};
    for (const [v, neighbors] of this.adj.entries()) {
      list[v] = Array.from(neighbors);
    }
    return list;
  }

  /**
   * Retorna la matriz de adyacencia y el orden de vértices usado.
   * - La matriz es de tamaño n x n, donde n = número de vértices.
   * - matriz[i][j] = 1 si existe arista vertices[i] -> vertices[j], de lo contrario 0.
   * @returns {{ vertices: Array<string|number>, matrix: number[][] }}
   */
  getAdjacencyMatrix() {
    const vertices = Array.from(this.adj.keys());
    // Orden estable y legible: por defecto alfabético si son strings, por valor si son números
    vertices.sort(this.#defaultSort);

    const index = new Map(vertices.map((v, i) => [v, i]));
    const n = vertices.length;
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));

    for (const [u, neighbors] of this.adj.entries()) {
      const i = index.get(u);
      for (const v of neighbors) {
        const j = index.get(v);
        matrix[i][j] = 1;
      }
    }
    return { vertices, matrix };
  }

  /**
   * Imprime la lista de adyacencia en formato legible:
   * v -> n1, n2, n3
   */
  printAdjacencyList() {
    console.log("=== Lista de Adyacencia ===");
    const vertices = Array.from(this.adj.keys()).sort(this.#defaultSort);
    for (const v of vertices) {
      const neighbors = Array.from(this.adj.get(v));
      neighbors.sort(this.#defaultSort);
      console.log(`${v} -> ${neighbors.join(", ") || "∅"}`);
    }
  }
/**
   * Imprime la matriz de adyacencia con encabezados.
   */
  printAdjacencyMatrix() {
    console.log("=== Matriz de Adyacencia ===");
    const { vertices, matrix } = this.getAdjacencyMatrix();

    // Encabezado
    const header = ["   "].concat(vertices.map(this.#toCell)).join(" ");
    console.log(header);

    // Filas
    for (let i = 0; i < vertices.length; i++) {
      const rowLabel = this.#toCell(vertices[i]);
      const row = matrix[i].map((v) => String(v).padStart(3, " "));
      console.log([rowLabel, ...row].join(" "));
    }
  }

  // ------------------ Utilidades privadas ------------------

  /**
   * Valida que la etiqueta del vértice sea un string o número “imprimible”.
   * (Evita objetos o valores nulos/indefinidos.)
   */
  #assertValidLabel(label) {
    const t = typeof label;
    if (label === null || label === undefined || (t !== "string" && t !== "number")) {
      throw new TypeError("El vértice debe ser string o número válido.");
    }
  }

  /**
   * Convierte un valor a celda con ancho fijo (3) para alinear impresión.
   */
  #toCell(value) {
    return String(value).padStart(3, " ");
  }

  /**
   * Orden por defecto: numérico si ambos son números; de lo contrario, alfabético.
   */
  #defaultSort(a, b) {
    const an = typeof a === "number";
    const bn = typeof b === "number";
    if (an && bn) return a - b;
    return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" });
  }
}
*/
(function demo() {
  const g = new DirectedGraph();

  // Agregar vértices (opcional: también se crean al agregar aristas)
  g.addVertex("A");
  g.addVertex("B");
  g.addVertex("C");
  g.addVertex("D");

  // Agregar aristas dirigidas
  g.addEdge("A", "B");
  g.addEdge("A", "C");
  g.addEdge("B", "C");
  g.addEdge("C", "A");
  g.addEdge("C", "D");
  g.addEdge("D", "D"); // bucle permitido

  // Imprimir representaciones
  g.printAdjacencyList();
  console.log(); // línea en blanco
  g.printAdjacencyMatrix();

  // Acceder a estructuras si las necesitas programáticamente:
  console.log(g.getAdjacencyList());
  console.log(g.getAdjacencyMatrix());
})();

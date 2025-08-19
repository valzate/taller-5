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



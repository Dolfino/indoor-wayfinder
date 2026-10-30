import { graphData, VertexData, GraphData } from "@/store/graphData";

type NodeId = string;
interface Node {
  id: NodeId;
  priority: number;
}

class PriorityQueue {
  values: Node[];

  constructor() {
    this.values = [];
  }

  enqueue(id: NodeId, priority: number) {
    const newNode: Node = { id, priority };
    this.values.push(newNode);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.values[parentIdx];
      if (element.priority >= parent.priority) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0 && end) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const leftChildIdx = 2 * idx + 1;
      const rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null &&
            leftChild &&
            rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

class DijkstraCalculator {
  adjacencyList: { [key: NodeId]: { id: NodeId; weight: number }[] };

  constructor() {
    this.adjacencyList = {};
  }

  loadGraph(data: GraphData) {
    this.adjacencyList = {};
    data.vertices.forEach((vertex) => {
      this.addVertex(vertex.id);
    });

    data.edges.forEach((edge) => {
      const { from, to } = edge;
      const fromVertex = data.vertices.find((vertex) => vertex.id === from);
      const toVertex = data.vertices.find((vertex) => vertex.id === to);

      if (fromVertex && toVertex) {
        const length = calculateDistance(fromVertex, toVertex);
        this.addEdge(from, to, length);
      }
    });
  }

  addVertex(vertex: NodeId) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1: NodeId, vertex2: NodeId, weight = 1) {
    if (!this.adjacencyList[vertex1]) this.adjacencyList[vertex1] = [];
    if (!this.adjacencyList[vertex2]) this.adjacencyList[vertex2] = [];
    this.adjacencyList[vertex1].push({ id: vertex2, weight });
    this.adjacencyList[vertex2].push({ id: vertex1, weight });
  }

  calculateShortestPath(start: NodeId, finish: NodeId) {
    const nodes = new PriorityQueue();
    const distances: { [key: NodeId]: number } = {};
    const previous: { [key: NodeId]: NodeId } = {};
    const path = [];
    let smallest: string | null = null;

    for (const vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      delete previous[vertex];
    }

    while (nodes.values.length) {
      smallest = nodes.dequeue().id;
      if (smallest === finish) {
        if (distances[smallest] === Infinity) {
          return [];
        }
        while (smallest && previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest && distances[smallest] !== Infinity) {
        for (const neighbor in this.adjacencyList[smallest]) {
          const nextNode = this.adjacencyList[smallest][neighbor];
          const candidate = distances[smallest] + nextNode.weight;
          const nextNeighbor = nextNode.id;
          if (candidate < distances[nextNeighbor]) {
            distances[nextNeighbor] = candidate;
            previous[nextNeighbor] = smallest;
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }

    let finalPath: string[] = [];
    if (!smallest) {
      finalPath = path.reverse();
    } else {
      finalPath = path.concat(smallest).reverse();
    }

    if (finalPath.length <= 1) {
      return [];
    }

    return finalPath;
  }
}

function calculateDistance(vertex1: VertexData, vertex2: VertexData) {
  const dx = vertex2.cx - vertex1.cx;
  const dy = vertex2.cy - vertex1.cy;
  return Math.sqrt(dx * dx + dy * dy);
}

export const graph = new DijkstraCalculator();

// Carregar inicialmente com os dados padrão
graph.loadGraph(graphData);

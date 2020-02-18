export default function MaxFlow(graph: number[][], vertices: number): number {
  const breadthFirstSearch = (residualGraph: number[][], source: number, sink: number, parent: number[]) => {
    
    //Created a visited array and mark all vertices as not visited
    let visited: boolean[] = Array(vertices).fill(false);

    //Create a queue, enqueue source vertex and mark source vertix as visited
    let queue: number[] = [];
    queue.push(source);
    visited[source] = true;
    parent[source] = -1;

    while (queue.length !== 0) {
      const u = queue[0];
      queue.shift();

      for (let v = 0; v < vertices; v++) {
        if (visited[v] === false && residualGraph[u][v] > 0) {
          queue.push(v);
          parent[v] = u;
          visited[v] = true;
        }
      }
    }

    return visited[sink] === true;
  }

  const fordFulkerson = (graph: number[][], source: number, sink: number): number => {
    let u: number;
    let v: number;

    let rGraph = [...graph];

    // let rGraph: number[][] = Array(vertices).fill(Array(vertices));
    // for (u = 0; u < vertices; u++) {
    //   for (v = 0; v < vertices; v++) {
    //     rGraph[u][v] = graph[u][v];
    //   }
    // }

    let parent: number[] = Array(vertices);

    let maxFlow: number = 0;

    while (breadthFirstSearch(rGraph, source, sink, parent)) {
      let pathFlow: number = Number.MAX_VALUE;
      for (v = sink; v !== source; v = parent[v]) {
        u = parent[v];
        pathFlow = Math.min(pathFlow, rGraph[u][v]);
      }

      for (v = sink; v !== source; v = parent[v]) {
        u = parent[v];
        rGraph[u][v] -= pathFlow;
        rGraph[v][u] += pathFlow;
      }

      maxFlow += pathFlow;
    }

    return maxFlow;
  }

  return fordFulkerson(graph, 0, 5);
}
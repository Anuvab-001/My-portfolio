export interface CampusLocation {
  id: string;
  name: string;
  zone: string;
}

export interface CampusEdge {
  from: string;
  to: string;
  distanceMeters: number;
}

export interface ShortestPathResult {
  found: boolean;
  pathIds: string[];
  pathNames: string[];
  totalDistanceMeters: number;
  estimatedMinutes: number;
  hops: Array<{ fromName: string; toName: string; distanceMeters: number }>;
}

export const DIU_LOCATIONS: CampusLocation[] = [
  { id: 'main-gate', name: 'Main Gate', zone: 'Entrance' },
  { id: 'knowledge-tower', name: 'Knowledge Tower (AB-04)', zone: 'Academic' },
  { id: 'central-library', name: 'Central Library', zone: 'Academic' },
  { id: 'innovation-lab', name: 'Innovation & CSE Lab', zone: 'Technology' },
  { id: 'green-garden', name: 'Green Garden', zone: 'Campus Hub' },
  { id: 'food-court', name: 'Food Court', zone: 'Student Center' },
  { id: 'sports-complex', name: 'Sports Complex', zone: 'Recreation' },
];

export const DIU_EDGES: CampusEdge[] = [
  { from: 'main-gate', to: 'green-garden', distanceMeters: 140 },
  { from: 'main-gate', to: 'knowledge-tower', distanceMeters: 220 },
  { from: 'green-garden', to: 'knowledge-tower', distanceMeters: 110 },
  { from: 'green-garden', to: 'food-court', distanceMeters: 95 },
  { from: 'knowledge-tower', to: 'central-library', distanceMeters: 85 },
  { from: 'knowledge-tower', to: 'innovation-lab', distanceMeters: 130 },
  { from: 'central-library', to: 'innovation-lab', distanceMeters: 75 },
  { from: 'food-court', to: 'sports-complex', distanceMeters: 180 },
  { from: 'central-library', to: 'sports-complex', distanceMeters: 210 },
];

interface HeapNode {
  id: string;
  dist: number;
}

class MinHeap {
  private items: HeapNode[] = [];

  get size(): number {
    return this.items.length;
  }

  push(node: HeapNode): void {
    this.items.push(node);
    this.bubbleUp(this.items.length - 1);
  }

  pop(): HeapNode | undefined {
    if (this.items.length === 0) return undefined;
    const min = this.items[0];
    const last = this.items.pop()!;
    if (this.items.length > 0) {
      this.items[0] = last;
      this.sinkDown(0);
    }
    return min;
  }

  private bubbleUp(index: number): void {
    let idx = index;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.items[parentIdx].dist <= this.items[idx].dist) break;
      [this.items[parentIdx], this.items[idx]] = [this.items[idx], this.items[parentIdx]];
      idx = parentIdx;
    }
  }

  private sinkDown(index: number): void {
    let idx = index;
    const len = this.items.length;
    while (true) {
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;
      let smallest = idx;
      if (left < len && this.items[left].dist < this.items[smallest].dist) {
        smallest = left;
      }
      if (right < len && this.items[right].dist < this.items[smallest].dist) {
        smallest = right;
      }
      if (smallest === idx) break;
      [this.items[idx], this.items[smallest]] = [this.items[smallest], this.items[idx]];
      idx = smallest;
    }
  }
}

export function buildAdjacencyList(
  locations: CampusLocation[] = DIU_LOCATIONS,
  edges: CampusEdge[] = DIU_EDGES
): Map<string, Array<{ neighbor: string; weight: number }>> {
  const adj = new Map<string, Array<{ neighbor: string; weight: number }>>();
  for (const loc of locations) {
    adj.set(loc.id, []);
  }
  for (const edge of edges) {
    adj.get(edge.from)?.push({ neighbor: edge.to, weight: edge.distanceMeters });
    adj.get(edge.to)?.push({ neighbor: edge.from, weight: edge.distanceMeters });
  }
  return adj;
}

export function findShortestCampusPath(
  sourceId: string,
  destinationId: string,
  locations: CampusLocation[] = DIU_LOCATIONS,
  edges: CampusEdge[] = DIU_EDGES
): ShortestPathResult {
  const locationMap = new Map(locations.map((loc) => [loc.id, loc]));
  if (!locationMap.has(sourceId) || !locationMap.has(destinationId)) {
    return {
      found: false,
      pathIds: [],
      pathNames: [],
      totalDistanceMeters: 0,
      estimatedMinutes: 0,
      hops: [],
    };
  }

  if (sourceId === destinationId) {
    const name = locationMap.get(sourceId)!.name;
    return {
      found: true,
      pathIds: [sourceId],
      pathNames: [name],
      totalDistanceMeters: 0,
      estimatedMinutes: 0,
      hops: [],
    };
  }

  const adj = buildAdjacencyList(locations, edges);
  const dist = new Map<string, number>();
  const prev = new Map<string, string | null>();
  const visited = new Set<string>();

  for (const loc of locations) {
    dist.set(loc.id, Infinity);
    prev.set(loc.id, null);
  }
  dist.set(sourceId, 0);

  const heap = new MinHeap();
  heap.push({ id: sourceId, dist: 0 });

  while (heap.size > 0) {
    const current = heap.pop()!;
    if (visited.has(current.id)) continue;
    visited.add(current.id);
    if (current.id === destinationId) break;

    const neighbors = adj.get(current.id) ?? [];
    for (const { neighbor, weight } of neighbors) {
      if (visited.has(neighbor)) continue;
      const alt = current.dist + weight;
      if (alt < (dist.get(neighbor) ?? Infinity)) {
        dist.set(neighbor, alt);
        prev.set(neighbor, current.id);
        heap.push({ id: neighbor, dist: alt });
      }
    }
  }

  const totalDistanceMeters = dist.get(destinationId) ?? Infinity;
  if (!Number.isFinite(totalDistanceMeters)) {
    return {
      found: false,
      pathIds: [],
      pathNames: [],
      totalDistanceMeters: 0,
      estimatedMinutes: 0,
      hops: [],
    };
  }

  const pathIds: string[] = [];
  let cursor: string | null = destinationId;
  while (cursor !== null) {
    pathIds.unshift(cursor);
    cursor = prev.get(cursor) ?? null;
  }

  const pathNames = pathIds.map((id) => locationMap.get(id)!.name);
  const hops: Array<{ fromName: string; toName: string; distanceMeters: number }> = [];
  for (let i = 0; i < pathIds.length - 1; i++) {
    const u = pathIds[i];
    const v = pathIds[i + 1];
    const edgeWeight =
      adj.get(u)?.find((item) => item.neighbor === v)?.weight ?? 0;
    hops.push({
      fromName: locationMap.get(u)!.name,
      toName: locationMap.get(v)!.name,
      distanceMeters: edgeWeight,
    });
  }

  // Average campus walking speed ~75 meters/minute
  const estimatedMinutes = Math.max(1, Math.ceil(totalDistanceMeters / 75));

  return {
    found: true,
    pathIds,
    pathNames,
    totalDistanceMeters,
    estimatedMinutes,
    hops,
  };
}

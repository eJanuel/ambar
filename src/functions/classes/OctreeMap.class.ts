import { MapCell } from "../../types/Map.types";


class OctreeNode {
    data: MapCell[] = [];
    children: OctreeNode[] | null = null;
}

export default class OctreeMap {
    root: OctreeNode;
    height: number;
    size: number;

    constructor(height: number, size: number) {
        this.root = new OctreeNode();
        this.height = height;
        this.size = size;
    }

    toSerializable(): any {
        const cells: {
            data: MapCell;
            coordinates: { x: number; y: number; z: number; };

        }[] = [];
        this.traverse(cell => cells.push({ data: cell, coordinates: cell.coordinates }));
        return cells;
    }

    static fromSerializable(height: number, size: number, serializable: any,): OctreeMap {
        const map = new OctreeMap(height, size);
        for (const cell of serializable.cells) {
            map.add(cell.data, cell.coordinates);
        }
        return map;
    }

    add(cell: MapCell, { x, y, z }: { x: number; y: number; z: number }) {
        let node = this.root;
        const maxI = Math.floor(Math.log2(Math.max(x, y, z)));
        for (let i = maxI; i >= 0; --i) {
            const bit = 1 << i;
            const ix = Number(!!(x & bit));
            const iy = Number(!!(y & bit));
            const iz = Number(!!(z & bit));
            const index = ix + (iy << 1) + (iz << 2); // Interleave bits
            if (!node.children) {
                node.children = Array(8).fill(null).map(() => new OctreeNode());
            }
            node = node.children[index];
        }
        node.data.push(cell);
    }

    get({ x, y, z }: { x: number; y: number; z: number }): MapCell[] | null {
        let node = this.root;
        for (let i = 30; i >= 0; --i) {
            if (!node.children) {
                return null;
            }
            const bit = 1 << i;
            const ix = Number(!!(x & bit));
            const iy = Number(!!(y & bit));
            const iz = Number(!!(z & bit));
            const index = ix + (iy << 1) + (iz << 2); // Interleave bits
            node = node.children[index];
        }
        return node.data;
    }

    remove({ x, y, z }: { x: number; y: number; z: number }): boolean {
        let node = this.root;
        for (let i = 30; i >= 0; --i) {
            if (!node.children) {
                return false;
            }
            const bit = 1 << i;
            const ix = Number(!!(x & bit));
            const iy = Number(!!(y & bit));
            const iz = Number(!!(z & bit));
            const index = ix + (iy << 1) + (iz << 2); // Interleave bits
            node = node.children[index];
        }
        node.data = [];
        return true;
    }

    getVerticalLayers(): MapCell[][] {
        const layers: MapCell[][] = Array(this.height).fill(null).map(() => []);
        for (let y = 0; y < this.height; y++) {
            this.traverse((cell: MapCell) => {
                if (cell.coordinates.y === y) {
                    layers[y].push(cell);
                }
            });
        }

        return layers;
    }

    traverse(callback: (cell: MapCell) => void): void {
        const stack: OctreeNode[] = [this.root];
        while (stack.length) {
            const node = stack.pop();
            if (node) {
                if (node.data.length) {
                    node.data.forEach(callback);
                }
                if (node.children) {
                    stack.push(...node.children);
                }
            }
        }
    }

}
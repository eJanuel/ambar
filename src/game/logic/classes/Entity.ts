export class Entity {
    id: string;
    position: { x: number; y: number; z: number };
    constructor(id: string, position: { x: number; y: number; z: number }) {
        this.id = id;
        this.position = position;
    }
}
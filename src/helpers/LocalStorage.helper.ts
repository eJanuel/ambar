export class LocalStorageHelper {
    constructor() {}

    public get(key: string): any | null {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    public put(key: string, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
        console.log("put", key, data);
    }

    public delete(key: string): void {
        localStorage.removeItem(key);
    }
}
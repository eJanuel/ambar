export class IndexedDBHelper {
    private dbName: string;
    private version: number;

    constructor(dbName: string, version: number = 1) {
        this.dbName = dbName;
        this.version = version;
    }

    private openDB(storeName: string): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const openRequest = indexedDB.open(this.dbName, this.version);

            openRequest.onupgradeneeded = (_event) => {
                const db = openRequest.result;
                if (!db.objectStoreNames.contains(storeName)) {
                    db.createObjectStore(storeName);
                }
            };

            openRequest.onerror = (_event) => {
                console.error("Error", openRequest.error);
                reject(openRequest.error);
            };

            openRequest.onsuccess = (_event) => {
                resolve(openRequest.result);
            };
        });
    }

    public upgradeDB(): void {
        this.version++;
    }

    public get(storeName: string, key: string): Promise<any | null> {
        return this.openDB(storeName).then(db => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(storeName, "readonly");
                const store = transaction.objectStore(storeName);
                const request = store.get(key);

                request.onsuccess = function () {
                    resolve(request.result);
                };

                request.onerror = function () {
                    console.error("Error", request.error);
                    reject(request.error);
                };
            });
        });
    }

    public getAll(storeName: string): Promise<{ key: string, data: any }[] | null> {
        return this.openDB(storeName).then(db => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(storeName, "readonly");
                const store = transaction.objectStore(storeName);
                const request = store.openCursor();
                const results: { key: string, data: any }[] = [];

                request.onsuccess = function (event) {
                    const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
                    if (cursor) {
                        results.push({ key: cursor.key as string, data: cursor.value });
                        cursor.continue();
                    } else {
                        resolve(results);
                    }
                };

                request.onerror = function () {
                    console.error("Error", request.error);
                    reject(request.error);
                };
            });
        });
    }

    public put(storeName: string, key: string, data: any): void {
        this.openDB(storeName).then(db => {
            const transaction = db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);
            const request = store.put(data, key);

            request.onerror = function () {
                console.error("Error", request.error);
            };
        });
    }

    public delete(storeName: string, key: string): Promise<void> {
        return this.openDB(storeName).then(db => {
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(storeName, "readwrite");
                const store = transaction.objectStore(storeName);
                const request = store.delete(key);

                request.onsuccess = function () {
                    console.log(key, " deleted")
                    resolve(request.result);
                };

                request.onerror = function () {
                    console.error("Error", request.error);
                    reject(request.error);
                };
            });
        });
    }
}
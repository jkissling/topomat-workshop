class List<T> {
    constructor(private data?: T[]) {
    }

    find(f: (item: T) => boolean): T {
        // ...
    }
}

let list: List<number>

// Fails
list = new List<number>(["1", "2"]);

// OK
list = new List<number>([1, 2]);

// TS infers v to be of type number
list.find(v => v > 1);
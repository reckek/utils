export class QueueError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "QueueError";
	}
}

export class Queue<T> {
	#queue: T[] = [];
	#maxSize: number;

	constructor(maxSize: number = Infinity) {
		this.#maxSize = maxSize;
	}

	isFull() {
		return this.#queue.length >= this.#maxSize;
	}

	isEmpty() {
		return this.#queue.length === 0;
	}

	peek(): T | null {
		return this.#queue[0] || null;
	}

	push(item: T): void | never {
		if (this.isFull()) {
			throw new QueueError("Queue is full");
		}

		this.#queue.push(item);
	}

	pop(): T | null {
		return this.#queue.shift() || null;
	}
}

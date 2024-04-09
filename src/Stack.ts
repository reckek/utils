export class StackError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "QueueError";
	}
}

export class Stack<T> {
	#stack: T[] = [];
	#maxSize: number;

	constructor(maxSize: number = Infinity) {
		this.#maxSize = maxSize;
	}

	isFull(): boolean {
		return this.#stack.length >= this.#maxSize;
	}

	isEmpty(): boolean {
		return this.#stack.length === 0;
	}

	peek(): T | undefined {
		return this.#stack[this.#stack.length - 1];
	}

	push(item: T): void | never {
		if (this.isFull()) {
			throw new StackError("Queue is full");
		}

		this.#stack.push(item);
	}

	pop(): T | undefined {
		return this.#stack.shift();
	}
}

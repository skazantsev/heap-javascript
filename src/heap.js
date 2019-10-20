export default class Heap {
    // Time complexity - O(N) where N is a number of elements in the passed array
    constructor(items = null, compare = null) {
        if (items != null && !Array.isArray(items))
            throw new Error('Invalid array.');

        if (compare != null && typeof compare !== 'function')
            throw new Error('Invalid compare function.');

        this.items = items || [];
        this.compare = compare || this.__defaultCompare;

        this.heapify();
    }

    // Time complexity - O(N)
    heapify() {
        for (let i = Math.floor(this.size - 1); i >= 0; --i) {
            this.__heapifyDown(i);
        }
    }

    // Time complexity - O(logN)
    push(item) {
        this.items.push(item);
        this.__heapifyUp(this.size - 1);
    }

    // Time complexity - O(logN)
    pop() {
        if (this.size === 0)
            return null;

        this.__swap(0, this.size - 1);
        const min = this.items.pop();
        this.__heapifyDown(0);
        return min;
    }

    // Time complexity - O(1)
    peek() {
        return this.size > 0 ? this.items[0] : null;
    }

    // Time complexity - O(1)
    clear() {
        this.items.splice(0, this.size);
    }

    // Time complexity - O(1)
    get size() {
        return this.items.length;
    }

    // Time complexity - O(logN)
    __heapifyDown(index) {
        const child_left_index = index * 2 + 1;
        const child_right_index = index * 2 + 2;

        if (child_left_index > this.size - 1)
            return;

        let min_index = child_left_index;
        if (
            child_right_index < this.size &&
            this.compare(this.items[child_left_index], this.items[child_right_index]) > 0) {
                min_index = child_right_index;
        }

        if (this.compare(this.items[index], this.items[min_index]) > 0) {
            this.__swap(index, min_index);
            this.__heapifyDown(min_index);
        }
    }

    // Time complexity - O(logN)
    __heapifyUp(index) {
        const parent_index = Math.floor((index - 1) / 2);
        if (
            parent_index >= 0 &&
            this.compare(this.items[parent_index], this.items[index]) > 0) {
                this.__swap(index, parent_index);
                this.__heapifyUp(parent_index);
        }
    }

    __defaultCompare(x, y) {
        if (x === y)
            return 0;

        return x > y ? 1 : -1;
    }

    __swap(i, j) {
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
}

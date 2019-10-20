import Heap from './heap'

it ('Should create a heap with valid parameters', () => {
    new Heap();
    new Heap([]);
    new Heap([2, 3, 1]);
    new Heap([2, 3, 1], (x, y) => x - y);
    new Heap([2, 3, 1], null);
    new Heap(['b', 'c', 'a']);
    new Heap(['b', 'c', 'a'], (x, y) => x.localeCompare(y));
    new Heap(['b', 'c', 'a'], null);
    new Heap([2, 3, 1], );
    new Heap([2, 3, 1], null);
    new Heap(null, null);
});

it ('Should throw when invalid parameters are passed', () => {
    expect(() => new Heap(1)).toThrow(new Error('Invalid array.'))
    expect(() => new Heap('a')).toThrow(new Error('Invalid array.'))
    expect(() => new Heap({})).toThrow(new Error('Invalid array.'))

    expect(() => new Heap([], 1)).toThrow(new Error('Invalid compare function.'))
    expect(() => new Heap([], 'a')).toThrow(new Error('Invalid compare function.'))
    expect(() => new Heap([], {})).toThrow(new Error('Invalid compare function.'))
});

it ('Should create a valid heap', () => {
    const minHeapOfFive = new Heap([6, 5, 2, 7, 4]);
    expect(minHeapOfFive.peek()).toEqual(2);
    expect(minHeapOfFive.size).toEqual(5);
    expect(satisfiesTheMinHeapProperty(minHeapOfFive));

    const minHeapOfSix = new Heap([6, 5, 1, 2, 7, 4]);
    expect(minHeapOfSix.peek()).toEqual(1);
    expect(minHeapOfSix.size).toEqual(6);
    expect(satisfiesTheMinHeapProperty(minHeapOfSix));

    const emptyHeap = new Heap();
    expect(emptyHeap.peek()).toEqual(null);
    expect(emptyHeap.size).toEqual(0);
});

it ('Should pop from a min heap', () => {
    const heap = new Heap([4, 3, 1, 2, 5]);

    expect(satisfiesTheMinHeapProperty(heap));
    expect(heap.peek()).toEqual(1);
    expect(heap.size).toEqual(5);

    expect(heap.pop()).toBe(1);

    expect(satisfiesTheMinHeapProperty(heap));
    expect(heap.peek()).toEqual(2);
    expect(heap.size).toEqual(4);

    expect(heap.pop()).toBe(2);
    
    expect(satisfiesTheMinHeapProperty(heap));
    expect(heap.peek()).toEqual(3);
    expect(heap.size).toEqual(3);

    expect(heap.pop()).toBe(3);
    
    expect(satisfiesTheMinHeapProperty(heap));
    expect(heap.peek()).toEqual(4);
    expect(heap.size).toEqual(2);

    expect(heap.pop()).toBe(4);
    
    expect(satisfiesTheMinHeapProperty(heap));
    expect(heap.peek()).toEqual(5);
    expect(heap.size).toEqual(1);

    expect(heap.pop()).toBe(5);
    
    expect(satisfiesTheMinHeapProperty(heap));
    expect(heap.peek()).toEqual(null);
    expect(heap.size).toEqual(0);

    expect(heap.pop()).toBe(null);

    expect(heap.peek()).toEqual(null);
    expect(heap.size).toEqual(0);
});

it ('Should push from a min heap', () => {
    const heap = new Heap([3, 8, 5]);

    expect(satisfiesTheMinHeapProperty(heap));
    expect(heap.peek()).toEqual(3);
    expect(heap.size).toEqual(3);

    heap.push(1);
    expect(satisfiesTheMinHeapProperty(heap));
    expect(heap.peek()).toEqual(1);
    expect(heap.size).toEqual(4);

    heap.push(4);
    expect(satisfiesTheMinHeapProperty(heap));
    expect(heap.peek()).toEqual(1);
    expect(heap.size).toEqual(5);
    
    heap.push(10);
    expect(satisfiesTheMinHeapProperty(heap));
    expect(heap.peek()).toEqual(1);
    expect(heap.size).toEqual(6);
});

it ('Should push and pop from a max heap', () => {
    const heap = new Heap([3, 8, 5], (x, y) => y - x);

    expect(satisfiesTheMaxHeapProperty(heap));
    expect(heap.peek()).toEqual(8);
    expect(heap.size).toEqual(3);

    heap.push(1);
    expect(satisfiesTheMaxHeapProperty(heap));
    expect(heap.peek()).toEqual(8);
    expect(heap.size).toEqual(4);
    
    heap.push(10);
    expect(satisfiesTheMaxHeapProperty(heap));
    expect(heap.peek()).toEqual(10);
    expect(heap.size).toEqual(5);

    expect(heap.pop()).toEqual(10);
    expect(satisfiesTheMaxHeapProperty(heap));
    expect(heap.peek()).toEqual(8);
    expect(heap.size).toEqual(4);
});

// TEST HELPERS

function satisfiesTheMinHeapProperty(heap, compare) {
    satisfiesTheHeapProperty(heap, (x, y) => x - y);
}

function satisfiesTheMaxHeapProperty(heap, compare) {
    satisfiesTheHeapProperty(heap, (x, y) => y - x);
}

function satisfiesTheHeapProperty(heap, compare) {
    for (let i = 0; i < Math.floor(heap.size / 2); ++i) {
        const child_left_index = i * 2 + 1;
        const child_right_index = i * 2 + 2;

        if (
            compare(heap.items[i], heap.items[child_left_index]) > 0 ||
            (child_right_index < heap.size && compare(heap.items[i], heap.items[child_right_index]) > 0)
        )
            throw new Error(`The heap violates the heap property: [${heap.items.join(' ')}]`);
    }
}

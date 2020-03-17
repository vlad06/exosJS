// A VECTOR TYPE

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(vector) {
        return new Vector(this.x + vector.x, this.y + vector.y)
    }

    minus(vector) {
        return new Vector(this.x - vector.x, this.y - vector.y)
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
console.log("Vector(1, 2) + Vector(2, 3) : ");
console.log(new Vector(1, 2).plus(new Vector(2, 3)));
console.log("Vector(1, 2) - Vector(2, 3) : ");
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
console.log("length of Vector(3, 4) : " + new Vector(3, 4).length);

// GROUPS

class Group {
    constructor() {
        this.members = [];
    }

    add(value) {                                    // or if(!this.has(value)) { this.members.push(value); }
        if(this.members.indexOf(value) == -1) {
            this.members.push(value);
        }
    }

    delete(value) {                                 // or this.members = this.members.filter(v => v !== value);
        if(this.members.indexOf(value) != -1) {
            this.members.splice(this.members.indexOf(value), 1);
        }
    }

    has(value) {                                    // or return this.members.includes(value);
        return this.members.indexOf(value) == -1 ? false : true;
    }

    static from(collection) {
        let group = new Group;
        for(let value of collection) {
            group.add(value);
        }
        return group;
    }

    [Symbol.iterator]() {
        return new GroupIterator(this);
    }
}

class GroupIterator {
    constructor(group) {
        this.group = group;
        this.position = 0;
    }
    next() {
        if(this.position >= this.group.members.length) {
            return {done: true};
        } else {
            let result = {value: this.group.members[this.position], done: false};
            this.position++;
            return result;
        }
    }
}

let group = Group.from([10, 20]);
console.log(group);
console.log(group.has(10));         // true
console.log(group.has(30));         // false
group.add(10);
console.log(group);
group.delete(10);
console.log(group);
console.log(group.has(10));         // false

for(let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}

// BORROWING A METHOD

let map = {one: true, two: true, hasOwnProperty: true};

console.log(Object.prototype.hasOwnProperty.call(map, "one"));
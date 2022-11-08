const log = console.log;

const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 }
];

/*
# map
*/

// 함수형 프로그래밍에서는 함수를 인자와 리턴으로 소통하는 것을 권장
const map = (f, iter) => {
    let res = []
    for (const a of iter) {
        res.push(f(a));
    }
    return res;
};

// let names = [];
// for (const p of products) {
//     names.push(p.name);
// }
// log(names);

log(map(p => p.name, products));

// let prices = [];
// for (const p of products) {
//     prices.push(p.price);
// }
// log(prices);

log(map(p => p.price, products));

log('---------------');

/*
# 이터러블 프로토콜을 따른 map의 다형성
*/

// array가 아니더라도 iterable하면 위에서 정의한 map함수 사용가능

function* gen() {
    yield 2;
    yield 3;
    yield 4;
}
log(map(a => a * a, gen()));

let m = new Map();
m.set('a', 10);
m.set('b', 20);
const it = m[Symbol.iterator]();
log(m);
log(new Map(map(([k, a]) => [k, a * 2], m)));

log('---------------');

/*
# filter
- 걸러내는 함수
*/

const filter = (f, iter) => {
    let res = [];
    for (const a of iter) {
        if (f(a)) res.push(a);
    }
    return res;
}

// let under20000 = [];
// for (const p of products) {
//     if (p.price < 20000) under20000.push(p);
// }
// log(...under20000);

log(...filter(p => p.price < 20000, products));

// let over20000 = [];
// for (const p of products) {
//     if (p.price >= 20000) over20000.push(p);
// }
// log(...over20000);

log(...filter(p => p.price >= 20000, products));

log(filter(n => n % 2, [1, 2, 3, 4]));

log(filter(n => n % 2, function* () {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
}()));

log('---------------');

/*
# reduce
- 축약하는 함수
*/

const nums = [1, 2, 3, 4, 5];

let total = 0;
for (const n of nums) {
    total = total + n;
}
log(total);

const reduce = (f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }

    for (const a of iter) {
        acc = f(acc, a);
    }
    return acc;
}

const add = (a, b) => a + b;

log(reduce(add, 0, [1, 2, 3, 4, 5]));
// 15

log(add(add(add(add(add(0, 1), 2), 3), 4), 5));
// 15

log(reduce(add, [1, 2, 3, 4, 5]));
// 15

log(reduce(
    (total_price, product) => total_price = total_price + product.price,
    0,
    products));

log('---------------');


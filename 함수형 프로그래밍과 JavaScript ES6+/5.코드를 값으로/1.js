const log = console.log;

const curry = f =>
  (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 }
];

const add = (a, b) => a + b;

log(
  reduce(
    add,
    map(p => p.price,
      filter(p => p.price < 20000, products))));

/*
# 코드를 값으로 다루어 표현력 높이기

## go, pipe
*/

const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

go(
  0,
  a => a + 1,
  a => a + 10,
  a => a + 100,
  log);
/// 111

const f = pipe(
  (a, b) => a + b,
  a => a + 10,
  a => a + 100);

log(f(0, 1));

go(
  products,
  products => filter(p => p.price < 20000, products),
  products => map(p => p.price, products),
  prices => reduce(add, prices),
  log); // 가독성

log('---------------');

/*
# curry
*/

const mult = curry((a, b) => a * b);
log(mult(3)(2));

const mult3 = mult(3);
log(mult3(10));
log(mult3(5));
log(mult3(3));

go(
  products,
  filter(p => p.price < 20000),
  map(p => p.price),
  reduce(add),
  log); // 가독성

log('---------------');

/*
# 함수 조합으로 함수 만들기
*/

const total_price = pipe(
  map(p => p.price),
  reduce(add));

const base_total_price = predi => pipe(
  filter(predi),
  total_price);

go(
  products,
  base_total_price(p => p.price < 20000),
  log);

go(
  products,
  base_total_price(p => p.price >= 20000),
  log);

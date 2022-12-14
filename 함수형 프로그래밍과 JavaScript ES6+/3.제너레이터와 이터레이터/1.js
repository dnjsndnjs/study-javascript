const log = console.log;

/*
# 제너레이터/이터레이터
- 제너레이터: 이터레이터이자 이터러블을 생성하는 함수
*/

function* gen() {
    yield 1;
    yield 2;
    yield 3;
    return 100; // done이 true일때의 value값. 순회에는 사용되지 않음
}
let iter = gen();
log(iter[Symbol.iterator]() == iter);
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());

for (const a of gen()) log(a);
// 제너레이터: 문장을 통해 순회할 수 있는 값을 만듦.

log('---------------');

/*
# odds
*/
function* infinity(i = 0) {
    while (true) yield i++;
}
function* limit(l, iter) {
    for (const a of iter) {
        yield a;
        if (a == l) return;
    }
}
function* odds(l) {
    for (const a of limit(l, infinity(1))) {
        if (a % 2) yield a;
    }
}
let iter2 = odds(10);
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());

// for (const a of odds(40)) log(a);

log('---------------');

/*
# for of, 전개 연산자, 구조 분해, 나머지 연산자
*/

log(...odds(10));
log([...odds(10), ...odds(20)]);

const [head, ...tail] = odds(10);
log(head);
log(tail);

const [a, b, ...rest] = odds(10);
log(a);
log(b);
log(rest);
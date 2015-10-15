import {bootstrap}  from './bootstrap.js';
import _Fetch       from "isomorphic-fetch";
import _Promise     from "bluebird";
import _Rx          from "rx";

bootstrap();

console.log("foobar");

function log(t) {
    console.log(t)
}

let funcs = ["a", "b", "return a + b"]

let f = new Function(...funcs)

let t0 = performance.now();
let ans = f(3, 4)
let t1 = performance.now();
console.log("Call to f took " + (t1 - t0) + " milliseconds.")

console.log(ans);

async function foo() {
    let a = await fetch("https://api.npmjs.org/downloads/point/last-day");
    let b = await a.json();
    console.log(b);
}


foo();


let mousemove = _Rx.Observable.fromEvent(document,   'mousemove');
let move      = mousemove.map(m => {return {x:m.pageX, y:m.pageY}});
let printm    = move.subscribe(x => log(x));

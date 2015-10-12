import {bootstrap}  from './bootstrap.js';
import _Fetch       from "isomorphic-fetch";
import _Promise     from "bluebird";

bootstrap();

console.log("foobar");

let funcs = ["a", "b", "return a + b"]

let f = new Function(...funcs)

let ans = f(3, 4)

console.log(ans);

async function foo() {
    let a = await fetch("https://api.npmjs.org/downloads/point/last-day");
    let b = await a.json();
    console.log(b);
}

foo();

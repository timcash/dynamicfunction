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

function checkcodes(a, b) {
    log(a);
    let patt = new RegExp(b);
    let res  = patt.test(a);
    return res;
}


foo();

let btnA = document.getElementById("btna");
let btnB = document.getElementById("btnb");
let box  = document.getElementById("thebox");


let seqence   = "AABBA";

let btnAClicks = _Rx.Observable.fromEvent(btnA,   'click').map(x => "A");
let btnBClicks = _Rx.Observable.fromEvent(btnB,   'click').map(x => "B");

let clicks     = _Rx.Observable.merge(btnAClicks, btnBClicks);
let add        = clicks.scan((acc, x) => {
    acc.push(x);
    setTimeout(()=>acc.shift(), 5000);
    return acc;
}, []);

let check     = add.do((x)=> {
    log("check");
    let res = checkcodes(x.join(""), seqence);
    setBox(res);
});

check.subscribe(x => {
    log("subscribe");
    log(x);
});

function setBox(x) {
    if(x)  box.style.backgroundColor = "green";
    if(!x) box.style.backgroundColor = "red";
    //log(x)
}

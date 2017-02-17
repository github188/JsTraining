let arr = [1, 10, 100, 1000, 10000];

function* read(a) {
    for(let i=0; i<a.length; i++) {
        yield a[i];
    }
}

let x = read();

for (let r of read(arr)) {
    console.log(r);
}
import init, { wasm_sieve,  wasm_ram_test, wasm_create_elements} from './pkg/WASMvsJS.js';
// calling SoE in JS

const funcs = {
    "Sieve_of_Eratosthenes": [js_sieve,wasm_sieve],
    "RAM_Test": [js_ram_test, wasm_ram_test],
    "DOM Creation": [js_create_elements, wasm_create_elements]
}
const rust_js = ["JavaScript", "Rust"];
const runs = 10;

document.addEventListener("DOMContentLoaded", function () {
    init();
    console.log("Loaded");
    for (const [testName, testFunctions] of Object.entries(funcs)) {
        for (const [index, implementation] of testFunctions.entries()) {
            const button = document.createElement("button");
            button.textContent = `Run ${testName} with ${rust_js[index]}`;
            button.addEventListener("click", () => {
                const input = prompt("Input:");
                let totalTime = [];
                let output;
                for (let i = 0; i < runs; i++) {
                    const startTime = performance.now();
                    output = implementation(input);
                    const endTime = performance.now();
                    console.log(output);
                    const elapsedTime = endTime - startTime;
                    totalTime.push(elapsedTime);
                    console.log(`Run ${i + 1}: ${elapsedTime} milliseconds`);
                }
                const averageTime = totalTime.reduce((a,b) => a+b, 0) / runs;
                console.log('Total time:', totalTime)
                console.log(`Function ${testName}, ${rust_js[index]} with input ${input} took ${averageTime} miliseconds to execute`);
            });
            document.body.appendChild(button);
        }
    }
});

function js_sieve(limit) {
    const sieve = new Array(Number(limit) + 1).fill(true);
    // 0 and 1 are not prime numbers
    sieve[0] = sieve[1] = false;
    const primes = [];
    for (let i = 2; i <= Math.sqrt(limit); i++) {
        if (sieve[i]) {
            for (let j = i ** 2; j <= limit; j += i) {
                sieve[j] = false;
            }
        }
    }
    for (let i = 0; i < sieve.length; i++) {
        if (sieve[i]) {
            primes.push(i);
        }
    }
    return primes;
}

function js_ram_test(size) {
    const array = new Array(size);
    // Write operation
    for (let i = 0; i < size; i++) {
        array[i] = i;
    }
    // Read operation
    for (let i = 0; i < size; i++) {
        array[i] += 1;
    }
}

// JavaScript equivalent to create_elements
function js_create_elements(count) {
    const body = document.body;

    for (let i = 0; i < count; i++) {
        const div = document.createElement("div");
        div.style.border = "2px solid #000";
        div.style.backgroundColor = "#e0e0e0";
        div.style.margin = "5px";
        div.textContent = "Hello, JavaScript!";
        div.textContent = "Hello, JavaScript!";
        body.appendChild(div);
    }
}
use std::vec;
use wasm_bindgen::prelude::*;

// Exporting the function to JavaScript
#[wasm_bindgen]
pub fn wasm_sieve(limit: usize) -> Vec<usize> {
    // Create a boolean vector to track whether each number is prime
    let mut sieve: Vec<bool> = vec![true; limit + 1];
    let mut primes: Vec<usize> = Vec::new();
    // 0 and 1 are not prime numbers
    sieve[0] = false;
    sieve[1] = false;
    // Iterate through the numbers starting from 2
    for i in 2..=(limit as f64).sqrt() as usize {
        if sieve[i] {
            primes.push(i);
            // Mark multiples of the current prime number as not prime
            for j in (i * i..=limit).step_by(i) {
                sieve[j] = false;
            }
        }
    }
    primes
}

#[wasm_bindgen]
pub fn wasm_ram_test(size: usize) {
    let mut vec: Vec<usize>  = Vec::with_capacity(size);
    // Write operation
    for i in 0..size {
        vec.push(i);
    }
    // Read operation
    for i in 0..size {
        vec[i] += 1;
    }
}


#[wasm_bindgen]
pub fn wasm_create_elements(count: usize) {
    let document = web_sys::window().unwrap().document().unwrap();
    for _ in 0..count {
        let div = document.create_element("div").unwrap();
        div.set_attribute("style", "border: 2px solid #000; background-color: #e0e0e0; margin: 5px;").unwrap();
        div.set_text_content(Some("Hello, WebAssembly!"));
        document.body().unwrap().append_child(&div).unwrap();
    }
}
# Benchmarking JSON vs JSON5

[Recent stirrings](https://twitter.com/jarredsumner/status/1779997854075171184) in the JavaScript Twitter community have brought a lot of attention to the shortcomings of JSON as a human-readable format, and proposed allowing JSON5 in place of it. JSON5 is a superset of JSON that allows for comments, trailing commas, and more. This is a great idea for more human-readable JSON, but I was curious about the performance implications of defaulting to JSON5 over JSON, since parsing JSON, being CPU-bound, can already be a bottleneck in many web services.

The benchmark includes 3 tests for each JSON and JSON5. All are valid JSON, which makes up the majority of JSON usage in the wild. All the test payloads have the same structure, but vary in the quantity of data they contain. The tests are as follows:

- Test 1: Small input: 4.36KiB
- Test 2: Medium input: 27.59KiB
- Test 3: Large input: 1407.77KiB

## Disclaimer

_This benchmark is not meant to be a comprehensive comparison of JSON and JSON5. It is a simple benchmark that compares the performance of JSON and JSON5 in an environment where parsing JSON payloads is a common task. This does not represent any meaningful performance difference for 1-time payloads, like reading a configuration file, which JSON5 may be more targeted to._

## Results

_The benchmark was run on Ubuntu 20.04, Node.js v20.12.2, on an older Intel i7-8700k@3.7GHz with 32GB of GDDR5 RAM._

### Small input: 4.36KiB

| (index) | name          | ops/sec | average (ms) | samples | relative to JSON small |
| ------- | ------------- | ------- | ------------ | ------- | ---------------------- |
| 0       | 'JSON small'  | 85056   | '0.012'      | 850566  | ''                     |
| 1       | 'JSON5 small' | 2006    | '0.498'      | 20063   | '42.40 x slower'       |

### Medium input: 27.59KiB

| (index) | name           | ops/sec | average (ms) | samples | relative to JSON medium |
| ------- | -------------- | ------- | ------------ | ------- | ----------------------- |
| 0       | 'JSON medium'  | 12938   | '0.077'      | 129383  | ''                      |
| 1       | 'JSON5 medium' | 315     | '3.172'      | 3153    | '41.07 x slower'        |

### Large input: 1407.77KiB

| (index) | name          | ops/sec | average (ms) | samples | relative to JSON large |
| ------- | ------------- | ------- | ------------ | ------- | ---------------------- |
| 0       | 'JSON large'  | 243     | '4.099'      | 2440    | ''                     |
| 1       | 'JSON5 large' | 5       | '174.584'    | 58      | '48.60 x slower'       |

## Running the benchmark

```sh
npm install
npm start
```

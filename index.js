import JSON5 from "json5";
import { readFileSync } from "fs";
import { Bench } from "tinybench";
import { logResultsTable } from "./format.js";

function json5(input) {
  return JSON5.parse(input);
}
function json(input) {
  return JSON.parse(input);
}

async function setup(task, mode) {
  if (mode === "run") {
    console.log(`Running "${task.name}"...`);
  }
}
async function runSmall() {
  const small = readFileSync("./blobs/small.json", "utf8");
  const smallBench = new Bench({ time: 10000, warmupIterations: 5, setup });
  smallBench
    .add("JSON5 small", () => {
      json5(small);
    })
    .add("JSON small", () => {
      json(small);
    });

  console.log("Benchmarking Small...");
  await smallBench.warmup();
  await smallBench.run();

  logResultsTable(smallBench);
}

async function runMedium() {
  const medium = readFileSync("./blobs/medium.json", "utf8");
  const mediumBench = new Bench({ time: 10000, warmupIterations: 5, setup });
  mediumBench
    .add("JSON5 medium", () => {
      json5(medium);
    })
    .add("JSON medium", () => {
      json(medium);
    });

  console.log("Benchmarking Medium...");
  await mediumBench.warmup();
  await mediumBench.run();

  logResultsTable(mediumBench);
}

async function runLarge() {
  const large = readFileSync("./blobs/large.json", "utf8");
  const largeBench = new Bench({ time: 10000, warmupIterations: 5, setup });
  largeBench
    .add("JSON5 large", () => {
      json5(large);
    })
    .add("JSON large", () => {
      json(large);
    });

  console.log("Benchmarking Large...");
  await largeBench.warmup();
  await largeBench.run();

  logResultsTable(largeBench);
}

console.log("Running benchmarks...");
await runSmall();
await runMedium();
await runLarge();

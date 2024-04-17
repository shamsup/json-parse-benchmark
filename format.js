/**
 * Heavily based on https://github.com/eknkc/ssr-benchmark/blob/master/src/result-format.js, ty @eknkc
 */
export function logResultsTable(bench) {
  const table = bench.tasks.map((task) => ({
    name: task.name,
    "ops/sec": task.result.error
      ? "NaN"
      : parseInt(task.result.hz.toString(), 10).toString(),
    "average (ms)": task.result.error ? "NaN" : task.result.mean.toFixed(3),
    samples: task.result.error ? "NaN" : task.result.samples.length,
  }));

  const results = table
    .map((x) => ({ ...x, "ops/sec": parseFloat(x["ops/sec"]) }))
    .toSorted((a, b) => b["ops/sec"] - a["ops/sec"]);

  const maxOps = Math.max(...results.map((x) => x["ops/sec"]));

  console.table(
    results.map((x, i) => ({
      ...x,
      [`relative to ${results[0]["name"]}`]:
        i === 0
          ? ""
          : `${(maxOps / parseInt(x["ops/sec"])).toFixed(2)} x slower`,
    }))
  );
}

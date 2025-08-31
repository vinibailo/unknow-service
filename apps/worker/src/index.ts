export function main() {
  console.log("Worker ready");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

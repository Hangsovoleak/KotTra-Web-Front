/** Simulates network latency so components already handle async/loading states correctly. */
export function mockDelay(data, ms = 300) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

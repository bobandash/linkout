export function createEndpoint(endpoint: string) {
  return `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`;
}

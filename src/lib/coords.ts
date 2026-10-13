export function fakeCoord(bairro: string) {
  let hash = 0
  for (let i = 0; i < bairro.length; i++) {
    hash = (hash * 31 + bairro.charCodeAt(i)) >>> 0
  }
  const latMin = 4 + (hash % 12)
  const lonMin = 8 + ((hash >> 4) % 16)
  return `21°${String(latMin).padStart(2, "0")}'S 44°${String(lonMin).padStart(2, "0")}'W`
}

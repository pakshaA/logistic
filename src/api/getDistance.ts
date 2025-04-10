function haversineDistance(coord1: [number, number], coord2: [number, number]): number {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;

  const R = 6371; // Радиус Земли в километрах
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

async function getDistanceByAir(from: string, to: string): Promise<number> {
  const fromCoord = await getCoordinates(from);
  const toCoord = await getCoordinates(to);

  return haversineDistance(fromCoord, toCoord);
}

async function getCoordinates(cityName: string): Promise<[number, number]> {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`);
  const data = await response.json();
  if (data.length === 0) throw new Error(`Город "${cityName}" не найден`);
  return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
}

export default getDistanceByAir;

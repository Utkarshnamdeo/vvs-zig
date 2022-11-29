import client from './client';
import { getLocationQuery, getTripQuery } from './queries';

export const getLocation = async ({
  location,
}: {
  location: string;
}): Promise<Record<string, any>> => {
  const endpoint = getLocationQuery({ location });
  return await client({ endpoint });
};

export const getTrips = async ({
  from,
  to,
  date,
}: {
  from: string;
  to: string;
  date: string;
}) => {
  const endpoint = getTripQuery({ from, to, date });
  return await client({ endpoint });
};

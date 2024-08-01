import { client } from '../api/client';

export async function getOffers() {
  const offers = await client.get(
    `api/${import.meta.env.VITE_API_VERSION}/offers`
  );
  return offers;
}

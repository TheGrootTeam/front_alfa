import { client } from '../api/client';
import { IOffers } from './interfaces/IOffer';

export async function getOffers() {
  const offers: IOffers = await client.get(
    `api/${import.meta.env.VITE_API_VERSION}/offers`
  );
  return offers.offers;
}

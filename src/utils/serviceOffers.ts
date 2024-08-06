import { client } from '../api/client';
import { IOffers } from './interfaces/IOffer';

export async function getOffers() {
  const offers: IOffers = await client.get(`/offers`);
  return offers.offers;
}

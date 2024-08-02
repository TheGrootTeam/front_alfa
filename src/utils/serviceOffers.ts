import { client } from '../api/client';
import { IOffers } from './interfaces/IOffer';

export async function getOffers() {
  const offers: IOffers = await client.get(`api/v1/offers`);
  return offers.offers;
}

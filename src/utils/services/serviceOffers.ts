import { client } from '../../api/client';
import { IOffers } from '../interfaces/IOffer';
import { IOffer } from '../interfaces/IOffer';

export async function getOffers() {
  const offers: IOffers = await client.get(`/offers`);
  return offers.offers;
}

export async function createOffer(newOffer: IOffer) {
  try {
    //BALIZA:
    console.log('newOffer -->', newOffer);

    const response = await client.post(`/offers/new`, newOffer);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

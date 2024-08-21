import { client } from '../../api/client';
import { IOffers } from '../interfaces/IOffer';
import { IOffer } from '../interfaces/IOffer';

export async function getOffers() {
  const offers: IOffers = await client.get(`/offers`);
  return offers.offers;
}

export async function createOffer(newOffer: IOffer) {
  try {
    const response = await client.post(`/offers/new`, newOffer);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}


export async function updateOffer(updatedOffer: IOffer) {
  try {
    //BALIZA:
    console.log('updatedOffer -->', updatedOffer);

    //const response = await client.patch(`/offers/${updatedOffer._id}`, updatedOffer);
    // BALIZA: Paso los datos en el body. La práctica habitual es hacerlo indicando el id en la URL. Mirar el respecto.
    const response = await client.patch('/offers/edit', updatedOffer);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
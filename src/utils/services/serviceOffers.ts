import { client } from '../../api/client';
import { IOfferForm, IOffers, IOffer, IOfferMapped } from '../interfaces/IOffer';


export async function getOffers() {
  const offers: IOffers = await client.get(`/offers`);
  return offers.offers;
}


export async function createOffer(newOffer: IOfferForm): Promise<IOfferMapped> {
  try {
    const response = await client.post<IOfferMapped>(`/offers/new`, newOffer);
    // Force the type of `response` to `IOfferMapped`
    const mappedOffer = response as unknown as IOfferMapped;
    // Fixed possible problems with the Date type
    if (!(mappedOffer.publicationDate instanceof Date)) {
      mappedOffer.publicationDate = new Date(mappedOffer.publicationDate);
    }
    return mappedOffer;
  } catch (error: any) {
    console.error('Error:', error);
    throw new Error(error.message || 'An error occurred while creating the offer');
  }
}


export async function updateOffer(updatedOffer: IOffer) {
  try {
    //const response = await client.patch(`/offers/${updatedOffer._id}`, updatedOffer);
    // DAL BALIZA: Paso los datos en el body. La práctica habitual es hacerlo indicando el id en la URL. Mirar el respecto.
    const response = await client.patch('/offers/edit', updatedOffer);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
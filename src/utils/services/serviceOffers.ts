import { client } from '../../api/client';
import { IOfferForm, IOffers, IOfferMapped } from '../interfaces/IOffer';

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
    throw new Error(
      error.message || 'An error occurred while creating the offer'
    );
  }
}

export async function updateOffer(updatedOffer: IOfferForm) {
  try {
    //const response = await client.patch(`/offers/${updatedOffer._id}`, updatedOffer);
    //The id data is in the body,
    const response = await client.patch<IOfferMapped>(
      '/offers/edit',
      updatedOffer
    );
    const mappedOffer = response as unknown as IOfferMapped;
    return mappedOffer;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function deleteOfferService(id: string) {
  const data = { offerId: id };
  await client.delete('/offers/delete', { data });
}
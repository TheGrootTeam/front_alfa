import { client } from '../../api/client';
import { infoCompanyMapped } from '../utilsInfoCompany';

export async function getPublicInfo(id:string | undefined, type:string) {
  //Falta crear interface y cambiar any per la interface
  const publicInfo: any = await client.get(
    `/profile/${type}/${id}`
  );
  const mappedInfo = infoCompanyMapped(publicInfo);
  return mappedInfo;
}
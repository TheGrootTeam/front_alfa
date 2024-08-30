import { client } from '../../api/client';
import { infocompanyMapped } from '../utilsInfoCompany';

export async function getPublicInfo(id:string, type:string) {
  //Falta crear interface y cambiar any per la interface
  const publicInfo: any = await client.get(
    `/profile/${type}/${id}`
  );
  const mappedInfo = infocompanyMapped(publicInfo);
  return mappedInfo;
}
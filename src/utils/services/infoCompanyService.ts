import { client } from '../../api/client';
import { infocompanyMapped } from '../utilsInfoCompany';

export async function getInfoCompany() {
  //Falta crear interface y cambiar any per la interface
  const infoCompany: any = await client.get(
    '/infoDashboards/company'
  );
  const mappedInfo = infocompanyMapped(infoCompany);
  return mappedInfo;
}
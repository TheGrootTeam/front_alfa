import { client } from '../../api/client';
import { infocompanyMapped } from '../utilsInfoCompany';

export async function getInfoCompany(id='') {
  //Falta crear interface y cambiar any per la interface
  const infoCompany: any = await client.get(
    `/infoDashboards/company/${id}`
  );
  const mappedInfo = infocompanyMapped(infoCompany);
  console.log(infoCompany)
  return mappedInfo;
}

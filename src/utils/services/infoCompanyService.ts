import { client } from '../../api/client';
import { infoCompanyMapped } from '../utilsInfoCompany';
import { IInfoCompanies, ICompanyInfoMapped } from '../interfaces/IInfoCompany';

export async function getInfoCompany(): Promise<ICompanyInfoMapped> {

  const infoCompany: IInfoCompanies = await client.get('/infoDashboards/company');

  //BALIZA
  console.log('INFO COMPANY SERVICES (accediendo a back): ', infoCompany);
  console.log('dentro: ', infoCompany.companyInfo[0]._id);

  //The architecture of infoCompany for accede to date is 'infoCompany.companyInfo[0]'
  //const mappedInfo = infoCompanyMapped(infoCompany);
  const mappedInfo = infoCompanyMapped(infoCompany.companyInfo[0]);

  //BALIZA
  console.log('MAPPED INFO', mappedInfo);
  return mappedInfo;
}


export interface CreateAppDataModel {
  app_name: string;
  app_secret: string;
  description: string;
  vendor_id: string;
  vendor_name: string;
  vendor_app_fqdn: string;
  userTier: string,
  file: string,
  price: string;
}


export const UserTiers = [
  {id: 1, value: 'Silver'},
  {id: 2, value: 'Gold'},
  {id: 3, value: 'Platinum'}
]

export interface CreateAppDataModel {
  app_name: string;
  app_secret: string;
  description: string;
  // vendor_id: string;
  // vendor_name: string;
  vendor_app_fqdn: string;
  userTier: string,
  file: string,
  // price: string;
  type: string;
  authType: string;
  geospec: string;
}


export const UserTiers = [
  {id: 1, value: 'Silver'},
  {id: 2, value: 'Gold'},
  {id: 3, value: 'Platinum'}
]

export interface PartnerListDataModel {
  partner_id: string;
  partner_name: string;
  description: string;
  short_name: string;
  api_endpoint: string;
  portal_url: string;
  registration_status: string;
  created_datetime_utc: string;
}

export interface VendorsListDataModel {
  contact_email: string;
  contact_name: string;
  contact_num: string;
  created_datetime_utc: string;
  status: string;
  vendor_id: string;
  vendor_name: string;
}

export interface AppListDataModel {
  app_icon_url: string;
  app_id: string;
  app_image_url: string;
  app_name: string;
  app_secret: string;
  created_datetime_utc: string;
  description: string;
  price: number;
  promoted_app: boolean;
  short_description: string;
  vendor_app_fqdn: string;
  vendor_id: string;
  vendor_name: string;
}

export interface CreateVendorDataModel {
  vendor_name: string;
  contact_email: string;
  contact_num: string;
  contact_name: string;
  vendor_id: string;
}
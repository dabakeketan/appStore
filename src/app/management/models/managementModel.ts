import { FormControl } from "@angular/forms";

export interface CreateAppDataModel {
  app_icon_url: string;
  app_icon_file: any;
  app_icon: any;
  app_icon_upload_url: string;
  app_image_url: string;
  app_image_file: any;
  app_image: any;
  app_image_upload_url: string;
  app_id?: string;
  app_name: string;
  app_secret: string;
  description: string;
  short_description: string;
  // vendor_id: string;
  // vendor_name: string;
  vendor_app_fqdn: string;
  // price: string;
  app_type: string;
  auth_type: string;
  geospec: string;
  user_mgmt_enabled: boolean
  user_tiers_enabled: boolean;
  tiersArr: Array<TiersObj>;
}

export interface TiersObj {
  name: string;
}

export interface PartnerListDataModel {
  partner_id: string;
  partner_name: string;
  description: string;
  short_name: string;
  api_endpoint: string;
  portal_url: string;
  registration_status: string;
  created_datetime_utc: string;
  oauth_client_id: string;
  oauth_client_secret: string;
  contact_name: string;
  contact_email: string;
  contact_num: string;
  contact_address: string;
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
  app_status: string;
}

export interface CreateVendorDataModel {
  vendor_name: string;
  contact_email: string;
  contact_num: string;
  contact_name: string;
  vendor_id: string;
}
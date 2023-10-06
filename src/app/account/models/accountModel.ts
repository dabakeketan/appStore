export interface LoginModel {
    shortname: string;
  }

  export interface CreatePartnerModel {
    oauth_client_id: string;
    oauth_client_secret: string;
    short_name: string;
    description: string;
    api_endpoint: string;
    portal_url: string;
    contact_name: string;
    contact_email: string;
    contact_num: string;
    contact_address: string;
  }

  export interface PartnerDataModel {
    api_endpoint: string;
    created_datetime_utc: string;
    description: string;
    logo_url: string;
    partner_id: string;
    partner_name: string;
    portal_url: string;
    registration_status: string;
    short_name: string;
  }
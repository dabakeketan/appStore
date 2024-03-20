export interface AppDataModel {
    app_icon_url: string;
    app_image_url: string;
    app_id: string;
    app_name: string;
    app_secret: string;
    app_status: any;
    created_datetime_utc: string;
    description: string;
    price: number;
    promoted_app: Boolean;
    vendor_app_fqdn: string;
    vendor_id: string;
    vendor_name: string;
    short_description: string;
    user_mgmt_enabled: boolean;
    user_tiers_enabled: boolean;
    domain_mgmt_enabled: boolean;
    domain_tiers_enabled: boolean;
    ns_config_name: string;
}

export interface CustomerUsersForPartnersDataModel {
    description: string;
    domain: string;
    email_sender: string;
    policies: string;
    residential: string;
    subscriber_count: number;
    territory: string;
    time_zone: string;
}

export interface CustomerEnabledUsersForPartnerDataModel {
    config_name: string;
    config_value: string;
    domain: string;
    user: string;
    status: boolean;
}

export interface CustomerUsersDataModel {
    dir: string;
    domain: string;
    first_name: string;
    last_name: string;
    group: string;
    site: string;
    user: string;
}

export interface CustomerEnabledUsersDataModel {
    config_name: string;
    config_value: string;
    domain: string;
    user: string;
    status: boolean;
}
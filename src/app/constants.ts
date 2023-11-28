import { environment } from "src/environments/environment";


export const baseUrl = environment.baseAppUrl;

export const mngAppBaseUrl = environment.mngAppBaseUrl;

export const mngAPIUrlAppender = '/mngAPIUrl';

export const APIUrls = {
    baseUrl: baseUrl,
    createPartner: baseUrl + 'partner',
    authenticatePartner: baseUrl + 'oauth/partner/',
    loginPartner: baseUrl + 'oauth/partner?short-name=',
    authorisation: baseUrl + 'oauth/authorisation',
    spotLightApps: baseUrl + 'app/apps?promoted=true',
    listApps: baseUrl + 'app/apps',
    partnerApps: baseUrl + 'partner/',
    appDetails: baseUrl + 'app/',
    customerApps: baseUrl + 'customer/'
}

export const MNGUrls = {
    baseUrl: mngAppBaseUrl,
    mngAppAuthUrl: mngAppBaseUrl + 'manage/oauth/login' + mngAPIUrlAppender,
    mngAppAuthToken: mngAppBaseUrl + 'manage/oauth/token' + mngAPIUrlAppender,
    createPartnerInvite: mngAppBaseUrl + 'manage/invite-code' + mngAPIUrlAppender,
    validateInviteCode: mngAppBaseUrl + 'manage/invite-code/validate?invite-code=',
    partnerBase: mngAppBaseUrl + 'manage/partner/' + mngAPIUrlAppender,
    getPartnersList: mngAppBaseUrl + 'manage/partner/partners' + mngAPIUrlAppender,
}

export const UserRoles = {
    basic: 'Basic'
}

export const CommonTexts = {

}

export const headerTexts = {
    categories: 'CATEGORIES',
    products: 'PRODUCTS',
    partnerReg: 'Partner Registration'
}

export const errorMsgs = {
    required: 'Required',
    invalidFormat: 'Invalid format'
}

export const successMsgs = {
    codeSentTo: 'Invite code sent to'
}

export const categoriesArr = [
    'Messaging', 'Analytics', 'CRM', 'Automation', 'Recording', 'Auto Dealers'
]

export const RegExPatterns = {
    urlWithoutHTTP: '^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$',
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    nonWhiteSpaces: /^\S*$/,
    phoenNumber: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, // (123) 456-789 (123)456-7890 123-456-7890 123.456.7890 1234567890 +31636363634 075-63546725
}

export const productsArr = [
    'Contact Center', 'Add-ins', 'Crexendo Labs', 'Softphone', 'Bots', 'Cloud Fax'
]

export const FontAwsIcons = {
    create: 'fa-solid fa-plus fa-fw',
    update: 'fa-solid fa-pen fa-fw',
    delete: 'fa-solid fa-trash fa-fw',
    back: 'fa-solid fa-arrow-left-long fa-fw',
    eye: 'fa-solid fa-eye fa-fw',
    collapseOpen: 'fa-solid fa-circle-chevron-up fa-fw',
    collapseClose: 'fa-solid fa-circle-chevron-down fa-fw',
    checkCircle: 'fas fa-check-circle fa-fw',
    crossCircle: 'fas fa-times-circle fa-fw'
}

export const AlertTypes = {
    success: 'success'
}


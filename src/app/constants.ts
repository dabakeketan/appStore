import { environment } from "src/environments/environment";

// export const baseUrl = environment.baseUrl;


export const CommonTexts = {

}

export const headerTexts = {
    categories: 'CATEGORIES',
    products: 'PRODUCTS'
}

export const categoriesArr = [
    'Messaging', 'Analytics', 'CRM', 'Automation', 'Recording', 'Auto Dealers'
]

export const productsArr = [
    'Contact Center', 'Add-ins', 'Crexendo Labs', 'Softphone', 'Bots', 'Cloud Fax'
]

export const RegExPatterns = {
    urlWithoutHTTP: '^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$',
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
}

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



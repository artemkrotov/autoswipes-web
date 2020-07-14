export const API_BASE_URL = 'https://api.autoswipes.com';
export const ACCESS_TOKEN = 'token';

export const OAUTH2_REDIRECT_URI = 'https://web.autoswipes.com/oauth2/redirect'

export const FACEBOOK_AUTH_URL = API_BASE_URL + '/auth-service/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GOOGLE_AUTH_URL = API_BASE_URL + '/auth-service/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const VK_AUTH_URL = '/';

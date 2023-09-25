import { post, get } from '../service';

export type GetTokenParams = Record<'refreshToken' | 'clientId' | 'clientSecret', string>;
export type LoginRequestType = Record<'username' | 'password', string>;
export type TokenResponse = Record<'refreshToken' | 'tokenType' | 'value', string> & { additionalInformation: Partial<Record<string, string>> };
export type LoginParams = Pick<GetTokenParams, 'clientId' | 'clientSecret'> & LoginRequestType;
export type PermissionResponse = { home: MenuRoute.Route };

export const menuList = () => get<{}, MenuRoute.Route[] | []>(`/admin/menu/routes`, {});

export const getToken = (refreshToken: string) =>
  post<GetTokenParams, TokenResponse>(
    '/oauth/auth/refresh_token',
    {
      refreshToken,
      clientId: 'system',
      clientSecret: 'system',
    },
    { disableIcp: true }
  );

export const logoutApi = () => post('/oauth/auth/logout', {});

export const loginApi = (param: LoginRequestType) => post<LoginParams, TokenResponse>('/oauth/auth/login', { ...param, clientId: 'system', clientSecret: 'system' }, { disableIcp: true });

export const getUserApi = () => get<{}, Auth.userInfo>('/admin/user/info', {});

export const getPermissionApi = () => get<{}, PermissionResponse>('/admin/user/permission', {});

import {request} from '@umijs/max';

/** 登录接口 POST /api/login/account */

export interface SzrResponse {
  code: number;
  data?: any;
  msg?: string;
}

export interface LoginResponse {
  token: string;
  expire: number;
  user: LoginUser;
}

export interface LoginUser {
  id: number;
  username: string;
  name: string;
  email: string;

  avatar?: string;
  created_at: string;
  deleted_at: number;

  is_valid: boolean;
  last_login_at: string;

  phone: string | null;
  role: number;
  update_user: number | null;
  updated_at: string;
}


export async function httpRequest(params: any) {
  return request<SzrResponse>('/request/http', {
    method: 'POST',
    data: params,
  });
}



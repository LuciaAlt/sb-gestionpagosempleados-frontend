import api from '../../../shared/services/http';
import { authEndpoints } from '../endpoints/authEndpoints';
import { AuthUser, ForgotPasswordRequest, LoginRequest, LoginResponse, ResetPasswordRequest } from '../models/AuthModels';

function normalizeUser(response: LoginResponse): AuthUser {
  const source = response.usuario || response.user || response as any;
  return {
    ...source,
    permisos: source.permisos || response.permisos || [],
    token: undefined,
    loginAt: new Date().toISOString()
  } as AuthUser;
}

export const authService = {
  async login(request: LoginRequest) {
    const { data } = await api.post<LoginResponse>(authEndpoints.login, request);
    const token = data.token;
    const user = normalizeUser(data);
    return { token, user };
  },
  async forgotPassword(request: ForgotPasswordRequest) {
    const { data } = await api.post(authEndpoints.forgotPassword, request);
    return data;
  },
  async resetPassword(request: ResetPasswordRequest) {
    const { data } = await api.post(authEndpoints.resetPassword, request);
    return data;
  },
  async validateResetToken(token: string) {
    const { data } = await api.get(authEndpoints.validateResetToken, { params: { token } });
    return data;
  },
  async profile() {
    const { data } = await api.get<AuthUser>(authEndpoints.profile);
    return data;
  }
};

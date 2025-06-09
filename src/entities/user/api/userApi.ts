import axios from '@/shared/api/axiosInstance';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
}

export const userApi = {
  getProfile: async (): Promise<UserProfile> =>
    (await axios.get('/users/me')).data,
  updateProfile: async (data: Partial<UserProfile>) =>
    (await axios.patch('/users/me', data)).data,
};

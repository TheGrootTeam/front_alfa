import { verifyEmailService } from './services/passwordService';

export const verifyEmail = async (email: string) => {
  const data = await verifyEmailService(email);
  return data;
};

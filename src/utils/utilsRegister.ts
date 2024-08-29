import { RegisterPayload } from './interfaces/IAuth';
import { register } from './services/registerService';

export const registerUser = async (data: RegisterPayload) => {
    try {
      await register(data);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return (error.response.data.message as string);
      } else {
        return (error.error || (error.message as string));
      }
    }
  };

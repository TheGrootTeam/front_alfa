import { IErrListings } from './interfaces/IOffer';

export const isIErrListings = (obj: any): obj is IErrListings => {
  return (
    obj &&
    typeof obj === 'object' &&
    'config' in obj &&
    'data' in obj &&
    'error' in obj &&
    'headers' in obj &&
    'request' in obj &&
    'status' in obj &&
    'statusText' in obj
  );
};

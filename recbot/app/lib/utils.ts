import { NeynarAPIClient } from '@neynar/nodejs-sdk';
import { User } from '@neynar/nodejs-sdk/build/neynar-api/v2';
import { IcebreakerProfile } from './types';

export const ICEBREAKER_API_URL = 'https://app.icebreaker.xyz/api';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const ICEBREAKER_CREDENTIALS_URL =
  'https://app.icebreaker.xyz/credentials';
export const neynarClient = new NeynarAPIClient(
  process.env.NEYNAR_API_KEY ?? ''
);

export const getEthAddressForUser = (user: User) => {
  if (user.verified_addresses.eth_addresses.length) {
    return user.verified_addresses.eth_addresses[0];
  } else {
    return user.custody_address;
  }
};

type ProfileResponse = {
  profiles: IcebreakerProfile[];
};

export const getIcebreakerProfileFromFname = async (
  fname?: string
): Promise<IcebreakerProfile | undefined> => {
  if (!fname) {
    return;
  }
  try {
    const response = await fetch(`${BASE_URL}/api/fname?fname=${fname}`);
    if (!response.ok) {
      throw new Error('Error fetching data for fname');
    }
    const json: ProfileResponse = await response.json();
    return json.profiles[0];
  } catch (err) {
    console.error(err);
    return;
  }
};

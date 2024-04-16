import { createDirectus, rest, readItems } from '@directus/sdk';
import { CustomDirectusTypes, Mixes } from './directus';

const client = createDirectus<CustomDirectusTypes>(process.env.NEXT_PUBLIC_BACKEND_URL || '').with(rest());

export async function loadMixes(): Promise<Mixes[]> {
  return  await client.request(
    readItems('mixes')
  ) as any as Promise<Mixes[]>;
}

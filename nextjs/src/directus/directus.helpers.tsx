import { createDirectus, rest, readItems, readItem, SingletonCollections } from '@directus/sdk';
import { CustomDirectusTypes, DirectusFiles, Mixes as DirectusMixes, Global } from './directus';
import { Mixes, initializeMixes } from './mix.model';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL as string;
const client = createDirectus<CustomDirectusTypes>(apiUrl).with(rest());


export function assetsUrl(path?: string | DirectusFiles | null): string {
  if (!path) {
    return '';
  }
  path = typeof path === 'string' ? path : path.id;
  return `${apiUrl}/assets/${path}`;
}

export class DirectusHelper {

  private main?: Promise<Global>;
  private mixes?: Promise<Mixes>;

  private static _instance: DirectusHelper;

  private constructor() {}

  static instance(): DirectusHelper {
    if (!DirectusHelper._instance) {
      DirectusHelper._instance = new DirectusHelper();
    }
    return DirectusHelper._instance;
  }


  async loadMixes(): Promise<Mixes> {
    if (this.mixes) {
      return this.mixes;
    }

    const result = client.request(
      readItems('mixes')
    ) as any as Promise<DirectusMixes[]>;
  
    return this.mixes = result.then((mixes: DirectusMixes[]) => initializeMixes(mixes));
  }

  async loadGlobal(): Promise<Global> {
    if (this.main) {
      return this.main;
    }

    return this.main = client.request(
      readItems('global')
    ) as any as Promise<Global>;
  }
}

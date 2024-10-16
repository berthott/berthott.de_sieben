import { createDirectus, rest, readItems } from '@directus/sdk';
import { CustomDirectusTypes, DirectusFiles, Mixes as DirectusMixes, Global } from './directus';
import { Mix, Mixes, initializeMixes } from './mix.model';
import Fuse from 'fuse.js';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL as string;
const client = createDirectus<CustomDirectusTypes>(apiUrl).with(rest({
  onRequest: (options) => ({ ...options, cache: 'no-store' }),
}));


export function assetsUrl(path?: string | DirectusFiles | null): string {
  if (!path) {
    return '';
  }
  path = typeof path === 'string' ? path : path.id;
  return `${apiUrl}/assets/${path}`;
}

export function assetTransform(path?: string | DirectusFiles | null, transform?: { [key: string]: string}): string {
  path = assetsUrl(path);
  if (transform) {
    const transformString = Object.keys(transform).map(key => `${key}=${transform[key]}`).join('&');
    path = `${path}?${transformString}`;
  }
  return path;
}

export function downloadUrl(path?: string | DirectusFiles | null): string {
  return `${assetsUrl(path)}?download`;
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
  
    return this.mixes = result
      .then((mixes: DirectusMixes[]) => mixes.sort((a, b) => new Date(b.release!).getTime() - new Date(a.release!).getTime()))
      .then((mixes: DirectusMixes[]) => initializeMixes(mixes));
  }

  async getCurrentMix(search: string): Promise<Mix | null> {
    return this.loadMixes()
      .then(mixes => {
        const found = new Fuse(mixes, { keys: ['key'] }).search(search);
        return found.length > 0 ? found[0].item : null;
      });
  }

  async getMixByKey(key: string): Promise<Mix | null> {
    return this.loadMixes()
      .then(mixes => mixes.find(mix => mix.key === key) || null);
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

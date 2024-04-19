import { Mixes as DirectusMixes } from './directus';

export type Mix = DirectusMixes & {
  key: string;
  parsed_tracklist?: string[];
}

export type Mixes = Mix[];

export function initializeMix(mix: DirectusMixes): Mix {
  return {
    ...mix,
    key: mix.title ? mix.title.toLowerCase().replace(/ /g, '_').replace(/[^a-z0-9-_]/g, ''): mix.id.toString(),
    ...( mix.release ? {release: new Intl.DateTimeFormat('en-US', {
      year: "numeric",
      month: "long",
    }).format(new Date(mix.release))} : {}),
    ...( mix.tracklist ? {parsed_tracklist: parseTracklist(mix.tracklist)} : {}),
  };
}

export function initializeMixes(mixes: DirectusMixes[]): Mixes {
  return mixes.map(initializeMix);
}

export function getMixByKey(mixes: Mixes, key: string): Mix | undefined {
  return mixes.find(mix => mix.key === key);
}

function parseTracklist(tracklist: string): string[] {
  return tracklist.split('\n');
}
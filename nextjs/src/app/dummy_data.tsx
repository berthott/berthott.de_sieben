export type MixData = {
  text: string;
  file: string;
  mp3: string;
  playfm: string;
  date: string;
  tracklist: string[];
}

export type MixDatas = {
  [key: string]: MixData;
}

export const dummy_data: MixDatas = {
  allfalldown: {
    text: 'The fall of the empire is immanent',
    file: 'berthott - all fall down',
    mp3: 'berthott - all fall down.mp3',
    playfm: 'http://www.play.fm/recording/allfalldown20191',
    date: 'September 2007',
    tracklist: [
      "Junior Boys - Like a child (Carl Craig remix)",
      "Pascal Vert - La guitara (edit)",
      "Paul Kalkbrenner - Atzepeng",
      "Unkle - Burn my shadow (Slam remix)",
      "Zoo Brazil - Dubai nights",
      "Patrice Bäumel - Just electricity",
      "Guy Gerber & Chaim - My Space",
      "Roland Appel - Dark soldier",
      "Stephan Bodzin - Liebe ist...",
      "Avus - Spnkr",
      "Dahlback & Dahlback - Bempa",
      "Rekorder 8.1",
      "Theo Parrish - Falling up (Carl Craig remix)",
      "Radio Slave - Transistor Rhythm",
    ],
  },
  alone: {
    text: 'All Alone',
    file: 'berthott - all alone',
    mp3: 'berthott - all alone.mp3',
    playfm: 'https://www.mixcloud.com/phonanzafm/phonanzafm-feb-26th-2016-berthott-promo/',
    date: 'Februar 2016',
    tracklist: [
      "Legowelt - Lego Resistance",
      "Bicep - Just",
      "Fatima Al Qadiri - Shanghai Freeway",
      "A Made Up Sound - Malfunction (Adjust)",
      "Lena Willikens - Asphalt Kobold",
      "Dude Energy - Renee Running",
      "Djuma Soundsysem - Les Djinns (Trentemoller Remix)",
      "Drexciya - Black Sea",
      "Gesloten Cirkel - Chasing Away The Night",
      "Herman Schwartz - All Alone",
      "E.R.P. - Snowday",
      "Truncate - 86",
      "Helena Hauff - Spur",
      "Johannes Heil & Markus Suckut - EXILE 002 A",
      "Snuff Crew - More Fun",
      "Makossa and Megablast - Juno Ride",
      "Count Hemmendorff - Hidden Escape Tunnel",
    ],
  },
  amusement: {
    text: 'Amusement Park',
    file: 'berthott - Amusement Park',
    mp3: 'berthott - Amusement Park.mp3',
    playfm: 'http://www.play.fm/recording/amusementpark41850',
    date: 'November 2010',
    tracklist: [
      "The Seatbelts - Amusement Park",
      "Count Hemmendorff - The Laboratory",
      "Jatoma - Helix",
      "Patrice Bäumel - Sub",
      "Ken Haywakawa - Trip To Amsterdam (Chromatic Version)",
      "Steadycam - Knock Kneed",
      "Glitterbug - Oh My Hick!",
      "Dubfire - Rejekt",
      "Wolfgang Voigt - Geduld (DJ Koze Mix)",
      "Pupkulies & Rebecca - Burning Boats (Masomenos Rmx)",
      "Tommy Four Seven - Sor",
      "Traversable Wormhole - Transducer (Brian Sanhaji Remix)",
      "Phantom Ghost - The Shadow \"In Praise Of Shadows\" (IV) By Carsten Jost",
      "Tocotronic - Im Zweifel für den Zweifel (Tobias Thomas & Superpitcher Remix)",
      "Abe Duque feat. Virginia - Following My Heart (Oliver Huntemann Remix)",
      "Jonas Bering - Who Is Who",
      "Pfirter - Mi Estudio",
      "Supermayer - Two Of Us (Extended Album Version)",
      "Anders Ilar - Final",
      "Perc & Passarella Death Squad - Temperature's Rising",
      "Edit-Select - Bauer",
      "Unknown Artist - Amleto On 303",
      "Count Hemmendorff - The Secret Garden",
    ],
  },
}

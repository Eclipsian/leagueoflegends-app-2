export interface Champion {
  blurb: string;
  id: string;
  image: Image;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  name: string;
  partype: string;
  key: string;
  stats: {
    armor: number;
    armorperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackrange: number;
    attackspeed: number;
    attackspeedperlevel: number;
    crit: number;
    critperlevel: number;
    hp: number;
    hpperlevel: number;
    hpregen: number;
    hpregenperlevel: number;
    movespeed: number;
    mp: number;
    mpperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
  };
  tags: ChampionTag[];
  title: string;
  skins: {id: string; num: number; name: string; chromas: boolean }[];
  enemytips: string[];
  allytips: string[];
  lore: string;
  passive: Spell;
  spells: Spell[];
}

export enum ChampionTag {
  Assassin = 'Assassin',
  Fighter = 'Fighter',
  Mage = 'Mage',
  Marksman = 'Marksman',
  Support = 'Support',
  Tank = 'Tank',
  All = 'All',
}

export interface Spell {
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  costType: string;
  description: string;
  image: Image;
  name: string;
}

export interface Image {
  full: string;
  sprite: string;
  group: string;
}
// Pagination info returned by the API
export interface Info {
  count: number;
  pages: number;
  next_page: string | null;
  prev_page: string | null;
}

// Generic API response
export interface ApiResponse<T> {
  info: Info;
  results: T[];
}

// Character interface
export interface Character {
  id: number;
  name: string;
  img?: string;
  status?: string;
  gender?: string;
  age?: number | string;
  height?: string;
  birthplace?: string;
  residence?: string;
  occupation?: string;
  groups?: Array<{ name: string; subgroup: string[] }>;
  roles?: string[];
  alias?: string[];
  episodes?: string[];
  relatives?: Array<{ name: string; relation: string }>;
  voice_actor?: string;
  titan_shifter?: boolean;
  titans?: string[];
}

// Episode interface
export interface Episode {
  id: number;
  name: string;
  episode: string;
  url?: string;
  air_date?: string;
  characters?: number[];
  synopsis?: string;
  director?: string;
  writer?: string;
  season?: number;
  arc?: string;
}

// Location interface
export interface Location {
  id: number;
  name: string;
  region?: string;
  territory?: string;
  description?: string;
  notable_places?: string[];
  notable_inhabitants?: string[];
}

// Organization interface
export interface Organization {
  id: number;
  name: string;
  description?: string;
  location?: number;
  members?: number[];
  leader?: number;
  affiliation?: string;
  government?: string;
  military?: boolean;
  headquarters?: string;
  founded?: string;
  purpose?: string;
}

// Titan interface
export interface Titan {
  id: number;
  name: string;
  height?: string;
  abilities?: string[];
  current_inheritor?: number;
  previous_inheritors?: number[];
  allegiance?: string;
  description?: string;
}

// Specific response types
export type CharacterResponse = ApiResponse<Character>;
export type EpisodeResponse = ApiResponse<Episode>;
export type LocationResponse = ApiResponse<Location>;
export type OrganizationResponse = ApiResponse<Organization>;
export type TitanResponse = ApiResponse<Titan>;
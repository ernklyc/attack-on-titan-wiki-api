// API base URL from environment variable or default to localhost
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

import { CharacterResponse, EpisodeResponse, LocationResponse, OrganizationResponse, TitanResponse } from './types';

// Generic fetch function to handle API requests
async function fetchAPI<T>(endpoint: string, options = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    cache: 'no-store', // Disable caching for development
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.statusText} (${res.status})`);
  }

  return res.json() as Promise<T>;
}

// Fetch all characters with optional pagination
export function getCharacters(page = 1): Promise<CharacterResponse> {
  return fetchAPI<CharacterResponse>(`/characters?page=${page}`);
}

// Fetch a single character by ID
export function getCharacter(id: number) {
  return fetchAPI(`/characters/${id}`);
}

// Fetch all episodes with optional pagination
export function getEpisodes(page = 1) {
  return fetchAPI(`/episodes?page=${page}`);
}

// Fetch a single episode by ID
export function getEpisode(id: number) {
  return fetchAPI(`/episodes/${id}`);
}

// Fetch all locations with optional pagination
export function getLocations(page = 1) {
  return fetchAPI(`/locations?page=${page}`);
}

// Fetch a single location by ID
export function getLocation(id: number) {
  return fetchAPI(`/locations/${id}`);
}

// Fetch all organizations with optional pagination
export function getOrganizations(page = 1) {
  return fetchAPI(`/organizations?page=${page}`);
}

// Fetch a single organization by ID
export function getOrganization(id: number) {
  return fetchAPI(`/organizations/${id}`);
}

// Fetch all titans with optional pagination
export function getTitans(page = 1) {
  return fetchAPI(`/titans?page=${page}`);
}

// Fetch a single titan by ID
export function getTitan(id: number) {
  return fetchAPI(`/titans/${id}`);
}
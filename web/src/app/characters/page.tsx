"use client"

import { getCharacters } from '@/lib/api';
import CharacterCard from '@/components/CharacterCard';
import type { Character, CharacterResponse } from '@/lib/types';
import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Loading component for Suspense
function CharactersLoading() {
  return (
    <div className="w-full">
      <div className="animate-pulse flex flex-col space-y-4">
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-300 dark:bg-gray-700 h-72 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Filter controls component
function FilterControls({ 
  onFilterChange,
  currentFilters
}: { 
  onFilterChange: (filters: Record<string, string>) => void;
  currentFilters: Record<string, string>;
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter options
  const statusOptions = ['All', 'Alive', 'Deceased', 'Unknown'];
  const genderOptions = ['All', 'Male', 'Female'];
  const titanShifterOptions = ['All', 'Yes', 'No'];
  
  // Handle filter change
  const handleFilterChange = (filterName: string, value: string) => {
    const newFilters = { ...currentFilters };
    
    // If "All" is selected, remove the filter
    if (value === 'All') {
      delete newFilters[filterName];
    } else {
      newFilters[filterName] = value;
    }
    
    onFilterChange(newFilters);
  };

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="mb-4 flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-md"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 6h10m-10 6h10" />
        </svg>
        {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
      </button>
      
      {isFilterOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 animate-slideDown border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold mb-4 dark:text-white flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 6h10m-10 6h10" />
            </svg>
            Filter Characters
          </h2>
          
          {/* Main filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Status filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
              <div className="relative">
                <select 
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-red-500 focus:ring-red-500 pl-10 pr-4 py-2.5 appearance-none"
                  value={currentFilters['status'] || 'All'}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {/* Icon on the left */}
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                {/* Custom dropdown arrow */}
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>
            
            {/* Gender filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Gender</label>
              <div className="relative">
                <select 
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-red-500 focus:ring-red-500 pl-10 pr-4 py-2.5 appearance-none"
                  value={currentFilters['gender'] || 'All'}
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                >
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                {/* Custom dropdown arrow */}
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>
            
            {/* Titan Shifter filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Titan Shifter</label>
              <div className="relative">
                <select 
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-red-500 focus:ring-red-500 pl-10 pr-4 py-2.5 appearance-none"
                  value={currentFilters['titan_shifter'] || 'All'}
                  onChange={(e) => handleFilterChange('titan_shifter', e.target.value)}
                >
                  {titanShifterOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                {/* Custom dropdown arrow */}
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>
            
            {/* Search by name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search by name..."
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-red-500 focus:ring-red-500 pl-10 pr-4 py-2.5"
                  value={currentFilters['name'] || ''}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          
          {/* Additional filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {/* Affiliation search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Affiliation</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. Survey Corps"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-red-500 focus:ring-red-500 pl-10 pr-4 py-2.5"
                  value={currentFilters['group'] || ''}
                  onChange={(e) => handleFilterChange('group', e.target.value)}
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
              </div>
            </div>
            
            {/* Birthplace search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Birthplace</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. Shiganshina District"
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-red-500 focus:ring-red-500 pl-10 pr-4 py-2.5"
                  value={currentFilters['birthplace'] || ''}
                  onChange={(e) => handleFilterChange('birthplace', e.target.value)}
                />
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          
          {/* Active filters display */}
          {Object.keys(currentFilters).length > 0 && (
            <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Active filters:</span>
                
                {Object.entries(currentFilters).map(([key, value]) => (
                  <span 
                    key={key}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 shadow-sm"
                  >
                    <span className="font-semibold mr-1">{key}:</span> {value}
                    <button 
                      className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
                      onClick={() => handleFilterChange(key, 'All')}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
                
                <button
                  className="ml-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm border border-red-200 dark:border-red-800 rounded-full px-3 py-1.5 flex items-center hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  onClick={() => onFilterChange({})}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Clear all filters
                </button>
              </div>
            </div>
          )}
          
          {/* Apply filters button */}
          <div className="mt-6 flex justify-center">
            <button 
              onClick={() => setIsFilterOpen(false)} 
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Character grid component that accepts search params
function CharacterGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get current page from URL
  const page = searchParams.get('page') || "1";
  const currentPage = parseInt(page);

  // State for characters and filtering
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [paginationInfo, setPaginationInfo] = useState({
    count: 0,
    pages: 1,
    next_page: null as string | null,
    prev_page: null as string | null
  });
  
  // Get filter params from URL and initialize filters
  const [filters, setFilters] = useState<Record<string, string>>(() => {
    const initialFilters: Record<string, string> = {};
    
    // Extract filters from URL
    for (const [key, value] of searchParams.entries()) {
      if (key !== 'page' && value) {
        initialFilters[key] = value;
      }
    }
    
    return initialFilters;
  });
  
  // Load characters with filters
  useEffect(() => {
    async function loadCharacters() {
      setLoading(true);
      try {
        // Convert filters to query params
        const filterParams: Record<string, string> = {};
        
        // Handle special cases for filters
        if (filters.status && filters.status !== 'All') {
          filterParams.status = filters.status.toLowerCase();
        }
        
        if (filters.gender && filters.gender !== 'All') {
          filterParams.gender = filters.gender.toLowerCase();
        }
        
        // Fix Titan Shifter filter
        if (filters.titan_shifter) {
          if (filters.titan_shifter === 'Yes') {
            filterParams.titan_shifter = 'true';
          } else if (filters.titan_shifter === 'No') {
            filterParams.titan_shifter = 'false';
          }
        }
        
        if (filters.name) {
          filterParams.name = filters.name;
        }
        
        if (filters.group) {
          filterParams.group = filters.group;
        }
        
        if (filters.birthplace) {
          filterParams.birthplace = filters.birthplace;
        }
        
        const characterData = await getCharacters(currentPage, filterParams);
        setCharacters(characterData.results);
        setPaginationInfo(characterData.info);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadCharacters();
  }, [currentPage, filters]);
  
  // Update URL with filters
  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
    
    // Reset to page 1 when filters change
    const params = new URLSearchParams();
    params.set('page', '1');
    
    // Add filters to URL
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'All') {
        params.set(key, value);
      }
    });
    
    router.push(`/characters?${params.toString()}`);
  };
  
  // Generate pagination URL
  const getPaginationUrl = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNum.toString());
    return `/characters?${params.toString()}`;
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Characters</h1>
        
        {/* Character count badge */}
        <div className="bg-red-100 text-red-800 text-sm font-medium px-4 py-1.5 rounded-full dark:bg-red-900/50 dark:text-red-200 shadow-sm border border-red-200 dark:border-red-800">
          {paginationInfo.count} Characters
        </div>
      </div>

      {/* Filter controls */}
      <FilterControls 
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />

      {/* Loading state */}
      {loading ? (
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-300 dark:bg-gray-700 h-72 rounded-lg"></div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Character grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {characters && characters.length > 0 ? (
              characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-3">No characters match your filters</p>
                <button 
                  onClick={() => handleFilterChange({})} 
                  className="mt-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-md"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
            
          {/* Pagination controls */}
          {characters.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center justify-between bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
                Showing page {currentPage} of {paginationInfo.pages}
              </div>
              
              <div className="flex space-x-2">
                {currentPage > 1 && (
                  <Link 
                    href={getPaginationUrl(currentPage - 1)}
                    className="px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-white transition-colors border border-gray-200 dark:border-gray-600 shadow-sm"
                  >
                    Previous
                  </Link>
                )}
                
                {/* Show page numbers */}
                <div className="flex space-x-1">
                  {[...Array(Math.min(5, paginationInfo.pages))].map((_, i) => {
                    // Logic to show pages around current page
                    let pageNum = currentPage;
                    if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= paginationInfo.pages - 2) {
                      pageNum = paginationInfo.pages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    if (pageNum > 0 && pageNum <= paginationInfo.pages) {
                      return (
                        <Link 
                          key={i}
                          href={getPaginationUrl(pageNum)}
                          className={`w-10 h-10 flex items-center justify-center rounded-md shadow-sm border ${
                            pageNum === currentPage 
                              ? 'bg-red-600 text-white border-red-500' 
                              : 'bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white border-gray-200 dark:border-gray-600'
                          } transition-colors`}
                        >
                          {pageNum}
                        </Link>
                      );
                    }
                    return null;
                  })}
                </div>
                
                {currentPage < paginationInfo.pages && (
                  <Link 
                    href={getPaginationUrl(currentPage + 1)}
                    className="px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-white transition-colors border border-gray-200 dark:border-gray-600 shadow-sm"
                  >
                    Next
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

// Main page component that extracts page param from URL and passes to CharacterGrid
export default function CharactersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CharacterGrid />
    </div>
  );
}
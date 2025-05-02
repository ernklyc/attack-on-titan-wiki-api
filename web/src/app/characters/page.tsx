import { getCharacters } from '@/lib/api';
import CharacterCard from '@/components/CharacterCard';
import type { Character, CharacterResponse } from '@/lib/types';
import Link from 'next/link';
import { Suspense } from 'react';

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

// Helper function to safely extract page number from a URL
function getPageFromUrl(url: string | null): string | null {
  if (!url) return null;
  
  try {
    // Try to extract page parameter directly with regex
    const matches = url.match(/page=(\d+)/);
    if (matches && matches[1]) {
      return matches[1];
    }
    return null;
  } catch (error) {
    console.error("Error parsing pagination URL:", error);
    return null;
  }
}

// Character grid component that accepts search params
async function CharacterGrid({ 
  page = "1"
}: { 
  page?: string 
}) {
  const currentPage = parseInt(page);
  const characterData = await getCharacters(currentPage);
  const characters = characterData.results;
  
  // Calculate pagination values
  const totalPages = characterData.info.pages;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Characters</h1>
        
        {/* Character count badge */}
        <div className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-red-900 dark:text-red-200">
          {characterData.info.count} Characters
        </div>
      </div>

      {/* Character grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters && characters.length > 0 ? (
          characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">No characters found</p>
          </div>
        )}
      </div>
        
      {/* Pagination controls */}
      <div className="mt-8 flex flex-wrap items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
          Showing page {currentPage} of {totalPages}
        </div>
        
        <div className="flex space-x-2">
          {prevPage && (
            <Link 
              href={`/characters?page=${prevPage}`}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-white transition-colors"
            >
              Previous
            </Link>
          )}
          
          {/* Show page numbers */}
          <div className="flex space-x-1">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              // Logic to show pages around current page
              let pageNum = currentPage;
              if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              if (pageNum > 0 && pageNum <= totalPages) {
                return (
                  <Link 
                    key={i}
                    href={`/characters?page=${pageNum}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-md ${
                      pageNum === currentPage 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white'
                    } transition-colors`}
                  >
                    {pageNum}
                  </Link>
                );
              }
              return null;
            })}
          </div>
          
          {nextPage && (
            <Link 
              href={`/characters?page=${nextPage}`}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-white transition-colors"
            >
              Next
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

// Main page component that extracts page param from URL and passes to CharacterGrid
export default function CharactersPage({ 
  searchParams 
}: { 
  searchParams: { page?: string } 
}) {
  const page = searchParams.page || "1";
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<CharactersLoading />}>
        <CharacterGrid page={page} />
      </Suspense>
    </div>
  );
}
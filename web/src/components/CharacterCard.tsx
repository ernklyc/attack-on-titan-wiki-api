import { Character } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  // Default image if character.img is not available
  const imageUrl = character.img || 'https://via.placeholder.com/250x350?text=No+Image';
  
  // Determine status badge color
  const getStatusColor = () => {
    switch (character.status?.toLowerCase()) {
      case 'alive':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'deceased':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'unknown':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Get titan shifter badge class
  const getTitanShifterClass = () => {
    return 'bg-amber-100 text-amber-800 border-amber-300';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl relative">
      {/* Overlay gradient for text readability at the top */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/50 to-transparent z-10"></div>
      
      {/* Character name at the top */}
      <div className="absolute top-0 left-0 w-full p-3 z-20">
        <h2 className="text-lg font-bold text-white tracking-tight drop-shadow-md truncate">
          {character.name}
        </h2>
      </div>
      
      {/* Image container with proper aspect ratio */}
      <div className="relative w-full h-60">
        <Image 
          src={imageUrl}
          alt={`${character.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center"
          priority={false}
        />
      </div>
      
      {/* Character info */}
      <div className="p-4">
        <Link href={`/characters/${character.id}`}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight hover:text-red-600 dark:hover:text-red-400 transition-colors">
            {character.name}
          </h2>
        </Link>
        
        <div className="mt-3 space-y-2">
          {/* Status badges in horizontal row */}
          <div className="flex flex-wrap gap-2 mb-3">
            {character.status && (
              <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor()}`}>
                {character.status}
              </span>
            )}
            {character.titan_shifter && (
              <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${getTitanShifterClass()}`}>
                Titan Shifter
              </span>
            )}
          </div>
          
          {/* Character details */}
          <div className="space-y-1.5 text-sm">
            {character.gender && (
              <p className="text-gray-600 dark:text-gray-400 flex items-center">
                <span className="font-medium mr-1 text-gray-700 dark:text-gray-300">Gender:</span> 
                {character.gender}
              </p>
            )}
            
            {character.occupation && (
              <p className="text-gray-600 dark:text-gray-400 flex items-center">
                <span className="font-medium mr-1 text-gray-700 dark:text-gray-300">Occupation:</span>
                <span className="truncate">{character.occupation}</span>
              </p>
            )}

            {character.birthplace && (
              <p className="text-gray-600 dark:text-gray-400 flex items-center">
                <span className="font-medium mr-1 text-gray-700 dark:text-gray-300">From:</span>
                <span className="truncate">{character.birthplace}</span>
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Card footer with view details button */}
      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-100 dark:border-gray-700">
        <Link 
          href={`/characters/${character.id}`} 
          className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 flex items-center justify-center transition-colors"
        >
          View Details
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
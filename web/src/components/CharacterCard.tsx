"use client"

import { Character } from '@/lib/types';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  // Default image if character.img is not available - using a local fallback SVG
  const imageUrl = character.img || '/images/no-image.svg';
  const [imgError, setImgError] = useState(false);
  // State to control the modal visibility
  const [showModal, setShowModal] = useState(false);
  
  // Function to handle image loading error
  const handleImageError = () => {
    setImgError(true);
  };
  
  // Lock body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showModal]);

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
    <>
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
          {imgError ? (
            <Image 
              src="/images/no-image.svg"
              alt={`${character.name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center"
            />
          ) : (
            <Image 
              src={imageUrl}
              alt={`${character.name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center"
              priority={false}
              onError={handleImageError}
            />
          )}
        </div>
        
        {/* Character info */}
        <div className="p-4">
          <button 
            onClick={() => setShowModal(true)}
            className="text-xl font-bold text-gray-900 dark:text-white tracking-tight hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            {character.name}
          </button>
          
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
          <button 
            onClick={() => setShowModal(true)}
            className="w-full text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 flex items-center justify-center transition-colors"
          >
            View Details
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal for character details */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto modal-enter" 
          aria-labelledby="modal-title" 
          role="dialog" 
          aria-modal="true"
        >
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true"
              onClick={() => setShowModal(false)}
            ></div>

            {/* Modal position */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Modal content */}
            <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full modal-content-enter">
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute right-4 top-4 z-10 bg-gray-200/80 dark:bg-gray-700/80 dark:text-white rounded-full p-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Hero image */}
                <div className="relative h-72 w-full">
                  {imgError ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                      <Image 
                        src="/images/no-image.svg"
                        alt={`${character.name}`}
                        width={200}
                        height={200}
                        className="opacity-50"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full relative">
                      {/* Use img tag for more reliable image loading in the modal */}
                      <img 
                        src={imageUrl} 
                        alt={`${character.name}`}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        onError={handleImageError}
                      />
                    </div>
                  )}
                  
                  {/* Gradient overlay for text readability */}
                  <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/80 to-transparent"></div>
                  
                  {/* Character name */}
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h2 className="text-3xl font-bold text-white drop-shadow-lg">{character.name}</h2>
                    
                    {/* Status badges below name */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {character.status && (
                        <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor()}`}>
                          {character.status}
                        </span>
                      )}
                      {character.titan_shifter && (
                        <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border ${getTitanShifterClass()}`}>
                          Titan Shifter
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Character details */}
                <div className="p-6 space-y-6">                  
                  {/* Character info grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Personal Information</h3>
                      <div className="space-y-2">
                        {character.gender && (
                          <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Gender:</span> {character.gender}
                          </p>
                        )}
                        {character.age && (
                          <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Age:</span> {character.age}
                          </p>
                        )}
                        {character.height && (
                          <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Height:</span> {character.height}
                          </p>
                        )}
                        {character.birthplace && (
                          <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Birthplace:</span> {character.birthplace}
                          </p>
                        )}
                        {character.residence && (
                          <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Residence:</span> {character.residence}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">Additional Details</h3>
                      <div className="space-y-2">
                        {character.occupation && (
                          <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Occupation:</span> {character.occupation}
                          </p>
                        )}
                        {character.voice_actor && (
                          <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Voice Actor:</span> {character.voice_actor}
                          </p>
                        )}
                        {character.alias && character.alias.length > 0 && (
                          <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-medium">Aliases:</span> {character.alias.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Relationships and groups */}
                  <div className="space-y-5">
                    {character.groups && character.groups.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">Groups</h3>
                        <div className="flex flex-wrap gap-2">
                          {character.groups.map((group, index) => (
                            <span key={index} className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 border border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700">
                              {group.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {character.titans && character.titans.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-3">Titan Forms</h3>
                        <div className="flex flex-wrap gap-2">
                          {character.titans.map((titan, index) => (
                            <span key={index} className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-900 dark:text-amber-200 dark:border-amber-700">
                              {titan}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
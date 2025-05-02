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
  // State to track if the modal image is loaded
  const [modalImgLoaded, setModalImgLoaded] = useState(false);
  // Reset image error state when modal opens
  useEffect(() => {
    if (showModal) {
      setImgError(false);
    }
  }, [showModal]);
  
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
      // Reset modal image load state when modal closes
      setModalImgLoaded(false);
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showModal]);

  // Determine status badge color with more professional styling
  const getStatusColor = () => {
    switch (character.status?.toLowerCase()) {
      case 'alive':
        return 'bg-gray-900 text-green-300 border-green-600';
      case 'deceased':
        return 'bg-gray-900 text-[#c71f1f] border-[#c71f1f]';
      case 'unknown':
        return 'bg-gray-900 text-gray-300 border-gray-600';
      default:
        return 'bg-gray-900 text-gray-300 border-gray-600';
    }
  };

  // Get titan shifter badge class with branded styling
  const getTitanShifterClass = () => {
    return 'bg-gray-900 text-amber-300 border-amber-600';
  };

  return (
    <>
      <div className="bg-[#1a1a1a] rounded-lg shadow-xl overflow-hidden border border-gray-700 hover:border-[#c71f1f] transition-colors duration-200 relative">
        {/* Image container with proper aspect ratio */}
        <div className="relative w-full h-60">
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center bg-[#222222]">
              <Image 
                src="/images/no-image.svg"
                alt={`${character.name}`}
                width={100}
                height={100}
                className="opacity-40"
              />
            </div>
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
            className="text-xl font-bold text-white tracking-tight hover:text-[#c71f1f] transition-colors duration-200"
          >
            {character.name}
          </button>
          
          <div className="mt-3 space-y-2">
            {/* Status badges in horizontal row */}
            <div className="flex flex-wrap gap-2 mb-3">
              {character.status && (
                <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-md border shadow-sm ${getStatusColor()}`}>
                  {character.status}
                </span>
              )}
              {character.titan_shifter && (
                <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-md border shadow-sm ${getTitanShifterClass()}`}>
                  Titan Shifter
                </span>
              )}
            </div>
            
            {/* Character details */}
            <div className="space-y-1.5 text-sm">
              {character.gender && (
                <p className="text-gray-300 flex items-center">
                  <span className="font-medium mr-1 text-white">Gender:</span> 
                  {character.gender}
                </p>
              )}
              
              {character.occupation && (
                <p className="text-gray-300 flex items-center">
                  <span className="font-medium mr-1 text-white">Occupation:</span>
                  <span className="truncate">{character.occupation}</span>
                </p>
              )}

              {character.birthplace && (
                <p className="text-gray-300 flex items-center">
                  <span className="font-medium mr-1 text-white">From:</span>
                  <span className="truncate">{character.birthplace}</span>
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Card footer with view details button */}
        <div className="px-4 py-3 bg-[#222222] border-t border-gray-700">
          <button 
            onClick={() => setShowModal(true)}
            className="w-full text-sm font-medium text-[#c71f1f] hover:text-red-300 transition-colors duration-200 flex items-center justify-center"
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
              className="fixed inset-0 bg-black bg-opacity-90" 
              aria-hidden="true"
              onClick={() => setShowModal(false)}
            ></div>

            {/* Modal position */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Modal content */}
            <div className="inline-block align-bottom bg-[#1a1a1a] rounded-lg text-left overflow-hidden shadow-2xl border border-gray-700 sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="relative">
                {/* Close button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute right-4 top-4 z-10 bg-[#222222] text-white rounded-full p-2 hover:bg-[#c71f1f] transition-colors duration-200"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Hero image - with preloading setup */}
                <div className="relative h-72 w-full bg-[#222222]">
                  {/* Show loading skeleton until image loads */}
                  {!modalImgLoaded && !imgError && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-pulse w-16 h-16 rounded-full bg-gray-800"></div>
                    </div>
                  )}
                  
                  {imgError ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image 
                        src="/images/no-image.svg"
                        alt={`${character.name}`}
                        width={200}
                        height={200}
                        className="h-1/2 opacity-50"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 w-full h-full">
                      <Image 
                        src={imageUrl} 
                        alt={`${character.name}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={`object-cover object-center ${modalImgLoaded ? 'opacity-100' : 'opacity-0'}`}
                        onLoad={() => setModalImgLoaded(true)}
                        onError={() => {
                          console.log('Modal image error loading:', imageUrl);
                          setImgError(true);
                          setModalImgLoaded(true);
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Solid overlay for text readability */}
                  <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
                  
                  {/* Character name */}
                  <div className="absolute bottom-0 left-0 w-full p-6">
                    <h2 className="text-3xl font-bold text-[#c71f1f]">{character.name}</h2>
                    
                    {/* Status badges below name */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {character.status && (
                        <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-md border shadow-sm ${getStatusColor()}`}>
                          {character.status}
                        </span>
                      )}
                      {character.titan_shifter && (
                        <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-md border shadow-sm ${getTitanShifterClass()}`}>
                          Titan Shifter
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Character details */}
                <div className="p-6 space-y-6 bg-[#1a1a1a] text-white">                  
                  {/* Character info grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-[#c71f1f] border-b border-gray-700 pb-2">Personal Information</h3>
                      <div className="space-y-2">
                        {character.gender && (
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Gender:</span> {character.gender}
                          </p>
                        )}
                        {character.age && (
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Age:</span> {character.age}
                          </p>
                        )}
                        {character.height && (
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Height:</span> {character.height}
                          </p>
                        )}
                        {character.birthplace && (
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Birthplace:</span> {character.birthplace}
                          </p>
                        )}
                        {character.residence && (
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Residence:</span> {character.residence}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-[#c71f1f] border-b border-gray-700 pb-2">Additional Details</h3>
                      <div className="space-y-2">
                        {character.occupation && (
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Occupation:</span> {character.occupation}
                          </p>
                        )}
                        {character.voice_actor && (
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Voice Actor:</span> {character.voice_actor}
                          </p>
                        )}
                        {character.alias && character.alias.length > 0 && (
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Aliases:</span> {character.alias.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Relationships and groups */}
                  <div className="space-y-5">
                    {character.groups && character.groups.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-[#c71f1f] border-b border-gray-700 pb-2 mb-3">Groups</h3>
                        <div className="flex flex-wrap gap-2">
                          {character.groups.map((group, index) => (
                            <span key={index} className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md bg-gray-900 text-blue-300 border border-blue-600 shadow-sm">
                              {group.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {character.titans && character.titans.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-[#c71f1f] border-b border-gray-700 pb-2 mb-3">Titan Forms</h3>
                        <div className="flex flex-wrap gap-2">
                          {character.titans.map((titan, index) => (
                            <span key={index} className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md bg-gray-900 text-amber-300 border border-amber-600 shadow-sm">
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
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const sections = [
    { 
      title: 'Characters', 
      href: '/characters', 
      description: 'Explore all characters from the Attack on Titan universe, including their status, affiliations, and more.',
      icon: '/next.svg'
    },
    { 
      title: 'Episodes', 
      href: '/episodes', 
      description: 'Browse all episodes from the anime series with detailed information about each one.',
      icon: '/vercel.svg'
    },
    { 
      title: 'Locations', 
      href: '/locations', 
      description: 'Discover the key locations and territories in the Attack on Titan world.',
      icon: '/globe.svg'
    },
    { 
      title: 'Organizations', 
      href: '/organizations', 
      description: 'Learn about the military branches, governments, and other organizations.',
      icon: '/file.svg'
    },
    { 
      title: 'Titans', 
      href: '/titans', 
      description: 'All information about the various titans and their abilities.',
      icon: '/window.svg'
    },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full py-12 md:py-24 lg:py-32 bg-gray-800 relative">
        {/* Background gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800/90 to-gray-900/80"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Attack on Titan API Explorer
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore the world of Attack on Titan with our comprehensive database
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/characters" 
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Explore Characters
              </Link>
              <Link 
                href="https://github.com/your-username/attack-on-titan-api" 
                className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Explore the Database
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section) => (
            <Link 
              key={section.title} 
              href={section.href}
              className="block group"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <div className="mb-4 h-12 w-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                  <Image 
                    src={section.icon} 
                    alt={section.title} 
                    width={24} 
                    height={24}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {section.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 flex-grow">
                  {section.description}
                </p>
                <div className="mt-4 flex items-center text-red-600 dark:text-red-400">
                  <span>Explore</span>
                  <svg 
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 8l4 4m0 0l-4 4m4-4H3" 
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* API Features Section */}
      <div className="w-full bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              API Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4">
                <div className="text-2xl font-bold text-red-600 mb-2">200+</div>
                <div className="text-gray-700 dark:text-gray-300">Characters</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-red-600 mb-2">75+</div>
                <div className="text-gray-700 dark:text-gray-300">Episodes</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-red-600 mb-2">5</div>
                <div className="text-gray-700 dark:text-gray-300">Data Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

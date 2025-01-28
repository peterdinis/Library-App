"use client"

import {useState, useMemo, FC } from 'react';
import { Search, BookOpen, SlidersHorizontal, X, Ghost } from 'lucide-react';

const initialBooks = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    genre: "Classic",
    coverUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000",
    available: true
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    genre: "Science Fiction",
    coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=1000",
    available: true
  },
  {
    id: 3,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Non-Fiction",
    genre: "Science",
    coverUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1000",
    available: false
  },
];

const categories = ["All", "Fiction", "Non-Fiction"];
const genres = ["All", "Classic", "Science Fiction", "Science", "Biography"];

const AllBooksWrapper: FC = () => {
  const [books] = useState(initialBooks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
      const matchesGenre = selectedGenre === "All" || book.genre === selectedGenre;
      
      return matchesSearch && matchesCategory && matchesGenre;
    });
  }, [books, searchQuery, selectedCategory, selectedGenre]);

  return (
    <div className="min-h-screen dark:bg-background bg-gradient-to-br">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-sky-50">Filtre</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium dark:text-sky-50 text-gray-700 mb-2">
                Kategória
              </label>
              <select
                className="w-full px-4 py-3 dark:bg-stone-600 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-sky-50 mb-2">
                Žáner
              </label>
              <select
                className="w-full px-4 py-3 bg-gray-50 dark:bg-stone-600 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {(selectedCategory !== "All" || selectedGenre !== "All") && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedGenre("All");
                }}
                className="w-full px-4 py-2 text-sm dark:text-sky-200 text-indigo-600 rounded-lg transition-colors"
              >
                Vyčistit filtre
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">Všetky knihy</h1>
        </div>

        {/* Search and Filter Toggle */}
        <div className="max-w-3xl mx-auto mb-12 flex gap-4">
          <div className="flex-1 backdrop-blur-sm bg-white/80 dark:bg-stone-800 rounded-2xl shadow-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Hľadať knihu..."
                className="w-full pl-12 pr-4 py-3 bg-transparent border-0 rounded-xl focus:ring-2 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 px-4 py-3 bg-white/80 dark:bg-background backdrop-blur-sm rounded-2xl shadow-xl hover:bg-white/90 transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden sm:inline">Filtre</span>
            {(selectedCategory !== "All" || selectedGenre !== "All") && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-indigo-600 rounded-full">
                {(selectedCategory !== "All" ? 1 : 0) + (selectedGenre !== "All" ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Active Filters */}
        {(selectedCategory !== "All" || selectedGenre !== "All") && (
          <div className="max-w-3xl mx-auto mb-8 flex flex-wrap gap-2">
            {selectedCategory !== "All" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800">
                {selectedCategory}
              </span>
            )}
            {selectedGenre !== "All" && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800">
                {selectedGenre}
              </span>
            )}
          </div>
        )}

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBooks.map(book => (
            <div key={book.id} className="group">
              <div className="relative aspect-[3/4] mb-4 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      book.available 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {book.available ? 'Available' : 'Checked Out'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-2">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-sky-50 mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-gray-600 dark:text-sky-50 text-sm mb-2">by {book.author}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-indigo-600 dark:text-sky-500 font-medium">{book.genre}</span>
                  <span className="text-sm text-gray-500 dark:text-stone-400">{book.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 dark:text-white ml-3 flex justify-center items-center">
                <Ghost className='animate-bounce w-8 h-8 ml-3' /> Žiadne knihy neboli nájdené
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllBooksWrapper
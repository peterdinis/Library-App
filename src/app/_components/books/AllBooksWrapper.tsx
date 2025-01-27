"use client"

import {useState, useMemo, FC } from 'react';
import { Search, BookOpen, Filter } from 'lucide-react';

// Sample book data (in real app, this would come from an API/database)
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
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search books by title or author..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <select
                className="pl-4 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{book.genre}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    book.available 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {book.available ? 'Available' : 'Checked Out'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No books found matching your criteria</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default AllBooksWrapper
import { Search } from 'lucide-react';
import { SortOption } from '@/types';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  categories: string[];
  levels: string[];
}

const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  sortBy,
  setSortBy,
  categories,
  levels,
}) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search courses, instructors, or topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Search courses"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Filter by category"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Filter by level"
        >
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          aria-label="Sort courses"
        >
          <option value={SortOption.Featured}>Featured</option>
          <option value={SortOption.Rating}>Highest Rated</option>
          <option value={SortOption.Students}>Most Popular</option>
          <option value={SortOption.PriceLow}>Price: Low to High</option>
          <option value={SortOption.PriceHigh}>Price: High to Low</option>
        </select>
      </div>
      <button
        onClick={() => {
          setSearchTerm('');
          setSelectedCategory('All');
          setSelectedLevel('All');
          setSortBy(SortOption.Featured);
        }}
        className="bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors"
        aria-label="Clear all filters"
      >
        Clear Filters
      </button>
    </div>
  </div>
);

export default Filters;
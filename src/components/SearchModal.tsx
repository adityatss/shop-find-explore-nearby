
import React, { useState, useMemo } from 'react';
import { Search, X, Store, Package } from 'lucide-react';
import { Shop } from '../types';

interface SearchModalProps {
  shops: Shop[];
  onSelectShop: (shop: Shop) => void;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ shops, onSelectShop, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'shops' | 'products'>('shops');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];

    const term = searchTerm.toLowerCase();

    if (searchType === 'shops') {
      return shops.filter(shop =>
        shop.name.toLowerCase().includes(term) ||
        shop.description.toLowerCase().includes(term) ||
        shop.address.toLowerCase().includes(term)
      );
    } else {
      // Search products across all shops
      const shopsWithMatchingProducts = shops.filter(shop =>
        shop.items.some(item =>
          item.name.toLowerCase().includes(term)
        )
      ).map(shop => ({
        ...shop,
        matchingItems: shop.items.filter(item =>
          item.name.toLowerCase().includes(term)
        )
      }));

      return shopsWithMatchingProducts;
    }
  }, [searchTerm, searchType, shops]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[70vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Search</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search Type Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
            <button
              onClick={() => setSearchType('shops')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                searchType === 'shops'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Store size={16} className="inline mr-2" />
              Shops
            </button>
            <button
              onClick={() => setSearchType('products')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                searchType === 'products'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package size={16} className="inline mr-2" />
              Products
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search for ${searchType}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        <div className="p-6 overflow-y-auto max-h-96">
          {!searchTerm.trim() && (
            <div className="text-center py-8">
              <Search size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">
                Start typing to search for {searchType}
              </p>
            </div>
          )}

          {searchTerm.trim() && searchResults.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                {searchType === 'shops' ? <Store size={48} /> : <Package size={48} />}
              </div>
              <p className="text-gray-500">
                No {searchType} found matching "{searchTerm}"
              </p>
            </div>
          )}

          <div className="space-y-3">
            {searchResults.map(shop => (
              <div
                key={shop.id}
                onClick={() => {
                  onSelectShop(shop);
                  onClose();
                }}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{shop.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{shop.address}</p>
                    
                    {searchType === 'products' && (shop as any).matchingItems && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {(shop as any).matchingItems.slice(0, 3).map((item: any, idx: number) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                          >
                            {item.name}
                          </span>
                        ))}
                        {(shop as any).matchingItems.length > 3 && (
                          <span className="text-gray-500 text-xs">
                            +{(shop as any).matchingItems.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {shop.description}
                    </p>
                  </div>
                  
                  <div className="ml-4 flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      {shop.posterUrl ? (
                        <img 
                          src={shop.posterUrl} 
                          alt={shop.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Store size={24} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;

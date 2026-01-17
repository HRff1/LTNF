'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiSearch, FiX, FiTrendingUp } from 'react-icons/fi'
import { searchContent } from '@/utils/api'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const trendingSearches = [
    'Technology News',
    'Black Friday Deals',
    'Cyber Monday Offers',
    'Latest Trends',
    'Health Tips',
    'Business Updates',
  ]

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setResults(null)
    }
  }, [isOpen])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        handleSearch()
      } else {
        setResults(null)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  const handleSearch = async () => {
    if (!query.trim()) return

    setLoading(true)
    try {
      const data = await searchContent(query)
      setResults(data)
    } catch (error) {
      console.error('Search error:', error)
      setResults(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      onClose()
    }
  }

  const handleTrendingClick = (term: string) => {
    setQuery(term)
    router.push(`/search?q=${encodeURIComponent(term)}`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl mx-4 bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="flex items-center space-x-4">
            <FiSearch className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search news, offers, categories..."
              className="flex-1 bg-transparent border-0 outline-none text-gray-900 dark:text-white placeholder-gray-500"
              autoFocus
            />
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <FiX className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {loading && (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Searching...</p>
            </div>
          )}

          {!loading && query && results && (
            <div className="p-4">
              {/* News Results */}
              {results.news && results.news.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                    News ({results.news.length})
                  </h3>
                  <div className="space-y-2">
                    {results.news.slice(0, 3).map((item: any) => (
                      <Link
                        key={item._id}
                        href={`/news/${item.slug}`}
                        onClick={onClose}
                        className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                          {item.excerpt}
                        </p>
                      </Link>
                    ))}
                  </div>
                  {results.news.length > 3 && (
                    <Link
                      href={`/search?q=${encodeURIComponent(query)}&type=news`}
                      onClick={onClose}
                      className="inline-block mt-2 text-sm text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      View all news results →
                    </Link>
                  )}
                </div>
              )}

              {/* Offers Results */}
              {results.offers && results.offers.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                    Offers ({results.offers.length})
                  </h3>
                  <div className="space-y-2">
                    {results.offers.slice(0, 3).map((item: any) => (
                      <Link
                        key={item._id}
                        href={`/offers/${item.slug}`}
                        onClick={onClose}
                        className="block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                            {item.title}
                          </h4>
                          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold ml-2">
                            {item.discount}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {results.offers.length > 3 && (
                    <Link
                      href={`/search?q=${encodeURIComponent(query)}&type=offers`}
                      onClick={onClose}
                      className="inline-block mt-2 text-sm text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      View all offers →
                    </Link>
                  )}
                </div>
              )}

              {/* No Results */}
              {(!results.news || results.news.length === 0) && 
               (!results.offers || results.offers.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    No results found for "{query}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Trending Searches */}
          {!query && (
            <div className="p-4">
              <div className="flex items-center mb-4">
                <FiTrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2" />
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Trending Searches
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleTrendingClick(term)}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import NewsGrid from '@/components/NewsGrid'
import OffersGrid from '@/components/OffersGrid'
import LoadingSpinner from '@/components/LoadingSpinner'
import { searchContent } from '@/utils/api'
import { FiSearch } from 'react-icons/fi'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const type = searchParams.get('type') || 'all'
  
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(type === 'offers' ? 'offers' : 'news')

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setLoading(false)
        return
      }

      try {
        const data = await searchContent(query, type)
        setResults(data)
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query, type])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  const newsResults = results?.news || []
  const offerResults = results?.offers || []
  const hasResults = newsResults.length > 0 || offerResults.length > 0

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <FiSearch className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Search Results
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Showing results for: <span className="font-semibold text-primary-600 dark:text-primary-400">"{query}"</span>
          </p>
        </div>

        {/* Tabs */}
        {type === 'all' && hasResults && (
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab('news')}
                className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === 'news'
                    ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                News ({newsResults.length})
              </button>
              <button
                onClick={() => setActiveTab('offers')}
                className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                  activeTab === 'offers'
                    ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Offers ({offerResults.length})
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {hasResults ? (
          <div>
            {/* News Results */}
            {(activeTab === 'news' || type === 'news') && newsResults.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  News Articles ({newsResults.length})
                </h2>
                <NewsGrid articles={newsResults} columns={3} />
              </section>
            )}

            {/* Offer Results */}
            {(activeTab === 'offers' || type === 'offers') && offerResults.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Offers ({offerResults.length})
                </h2>
                <OffersGrid offers={offerResults} columns={3} />
              </section>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Results Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn't find any results for "{query}"
            </p>
            <div className="flex justify-center space-x-4">
              <a href="/news" className="btn-primary">
                Browse News
              </a>
              <a href="/offers" className="btn-secondary">
                Browse Offers
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
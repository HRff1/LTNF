'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import OffersGrid from '@/components/OffersGrid'
import LoadingSpinner from '@/components/LoadingSpinner'
import Pagination from '@/components/Pagination'
import CategoryFilter from '@/components/CategoryFilter'
import { getLatestOffers, getOffersByCategory } from '@/utils/api'

export default function OffersPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState(category || 'all')

  const offersPerPage = 9

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true)
      try {
        let data
        if (selectedCategory === 'all') {
          data = await getLatestOffers(offersPerPage, currentPage)
        } else {
          data = await getOffersByCategory(selectedCategory, offersPerPage, currentPage)
        }
        setOffers(data.data)
        setTotalPages(Math.ceil(data.total / offersPerPage))
      } catch (error) {
        console.error('Error fetching offers:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOffers()
  }, [currentPage, selectedCategory])

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Best Offers & Deals
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover amazing deals and exclusive offers from top brands
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            type="offers"
          />
        </div>

        {/* Offers Grid */}
        {offers.length > 0 ? (
          <>
            <OffersGrid offers={offers} columns={3} />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Offers Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedCategory === 'all' 
                ? 'No offers available at the moment.' 
                : `No offers found in the ${selectedCategory} category.`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Hero from '@/components/Hero'
import NewsGrid from '@/components/NewsGrid'
import OffersGrid from '@/components/OffersGrid'
import TrendingSection from '@/components/TrendingSection'
import Newsletter from '@/components/Newsletter'
import LoadingSpinner from '@/components/LoadingSpinner'
import { getLatestNews, getLatestOffers, getTrendingNews } from '@/utils/api'

export default function HomePage() {
  const [news, setNews] = useState([])
  const [offers, setOffers] = useState([])
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsData, offersData, trendingData] = await Promise.all([
          getLatestNews(6),
          getLatestOffers(6),
          getTrendingNews(4)
        ])
        setNews(newsData.data)
        setOffers(offersData.data)
        setTrending(trendingData.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <>
      <Hero />
      
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrendingSection articles={trending} />
        </div>
      </section>

      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Latest News
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Stay updated with the latest happenings
            </p>
          </div>
          <NewsGrid articles={news} />
          <div className="text-center mt-8">
            <a href="/news" className="btn-primary">
              View All News
            </a>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Best Offers
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Don't miss these amazing deals
            </p>
          </div>
          <OffersGrid offers={offers} />
          <div className="text-center mt-8">
            <a href="/offers" className="btn-primary">
              View All Offers
            </a>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  )
}
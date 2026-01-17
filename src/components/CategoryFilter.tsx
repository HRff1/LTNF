'use client'

import { useState, useEffect } from 'react'
import { getAllCategories } from '@/utils/api'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
  type?: 'news' | 'offers' | 'both'
}

export default function CategoryFilter({ 
  selectedCategory, 
  onCategoryChange, 
  type = 'both' 
}: CategoryFilterProps) {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories()
        const filteredCategories = data.filter((cat: any) => {
          if (type === 'both') return true
          return cat.type === type || cat.type === 'both'
        })
        setCategories(filteredCategories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [type])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Link
        href={pathname}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
          selectedCategory === 'all'
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
        }`}
        onClick={() => onCategoryChange('all')}
      >
        All
      </Link>
      
      {categories.map((category) => (
        <Link
          key={category._id}
          href={`${pathname}?category=${category.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            selectedCategory === category.slug
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
          onClick={() => onCategoryChange(category.slug)}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}
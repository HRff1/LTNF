import Link from 'next/link'
import Image from 'next/image'
import { FiCalendar, FiUser, FiEye } from 'react-icons/fi'
import moment from 'moment'

interface NewsArticle {
  _id: string
  title: string
  slug: string
  excerpt: string
  featuredImage: string
  category: string
  publishedAt: string
  author: string
  viewCount: number
  readingTime?: number
}

interface NewsCardProps {
  article: NewsArticle
}

export default function NewsCard({ article }: NewsCardProps) {
  const defaultImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop'

  return (
    <article className="card group cursor-pointer">
      <Link href={`/news/${article.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={article.featuredImage || defaultImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {article.category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
            {article.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <FiCalendar className="w-4 h-4" />
                <span>{moment(article.publishedAt).format('MMM DD, YYYY')}</span>
              </span>
              <span className="flex items-center space-x-1">
                <FiUser className="w-4 h-4" />
                <span>{article.author}</span>
              </span>
            </div>
            <span className="flex items-center space-x-1">
              <FiEye className="w-4 h-4" />
              <span>{article.viewCount || 0}</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
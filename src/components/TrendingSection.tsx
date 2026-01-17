import Link from 'next/link'
import Image from 'next/image'
import { FiTrendingUp, FiCalendar, FiEye } from 'react-icons/fi'
import moment from 'moment'

interface NewsArticle {
  _id: string
  title: string
  slug: string
  featuredImage: string
  category: string
  publishedAt: string
  viewCount: number
}

interface TrendingSectionProps {
  articles: NewsArticle[]
}

export default function TrendingSection({ articles }: TrendingSectionProps) {
  const defaultImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&h=200&fit=crop'

  if (!articles || articles.length === 0) {
    return null
  }

  return (
    <section>
      <div className="flex items-center mb-8">
        <FiTrendingUp className="w-8 h-8 text-primary-600 dark:text-primary-400 mr-3" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Trending Now
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.slice(0, 4).map((article, index) => (
          <Link key={article._id} href={`/news/${article.slug}`}>
            <article className="group cursor-pointer">
              <div className="flex items-start space-x-4">
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={article.featuredImage || defaultImage}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="80px"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs font-semibold px-2 py-1 rounded">
                      #{index + 1}
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <FiCalendar className="w-3 h-3" />
                      <span>{moment(article.publishedAt).format('MMM DD')}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FiEye className="w-3 h-3" />
                      <span>{article.viewCount || 0}</span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
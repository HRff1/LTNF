import NewsCard from './NewsCard'

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

interface NewsGridProps {
  articles: NewsArticle[]
  columns?: number
}

export default function NewsGrid({ articles, columns = 3 }: NewsGridProps) {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={`grid ${gridClasses[columns as keyof typeof gridClasses]} gap-6`}>
      {articles.map((article) => (
        <NewsCard key={article._id} article={article} />
      ))}
    </div>
  )
}
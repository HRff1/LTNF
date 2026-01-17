import Link from 'next/link'
import Image from 'next/image'
import { FiTag, FiClock, FiExternalLink } from 'react-icons/fi'
import moment from 'moment'

interface Offer {
  _id: string
  title: string
  slug: string
  description: string
  discount: string
  couponCode?: string
  originalPrice?: number
  discountedPrice?: number
  featuredImage: string
  category: string
  expiryDate: string
  isFeatured?: boolean
}

interface OfferCardProps {
  offer: Offer
}

export default function OfferCard({ offer }: OfferCardProps) {
  const defaultImage = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop'
  const isExpired = moment(offer.expiryDate).isBefore(moment())

  return (
    <article className="card group cursor-pointer relative">
      {offer.isFeatured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            Featured
          </span>
        </div>
      )}

      <Link href={`/offers/${offer.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={offer.featuredImage || defaultImage}
            alt={offer.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              {offer.discount}
            </span>
          </div>
          {isExpired && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
                Expired
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
            {offer.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {offer.description}
          </p>

          {offer.couponCode && (
            <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Coupon Code:</span>
                <span className="font-mono font-bold text-primary-600 dark:text-primary-400">
                  {offer.couponCode}
                </span>
              </div>
            </div>
          )}

          {offer.originalPrice && offer.discountedPrice && (
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  ${offer.discountedPrice}
                </span>
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ${offer.originalPrice}
                </span>
              </div>
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm font-semibold">
                Save ${offer.originalPrice - offer.discountedPrice}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center space-x-1">
              <FiTag className="w-4 h-4" />
              <span>{offer.category}</span>
            </span>
            <span className="flex items-center space-x-1">
              <FiClock className="w-4 h-4" />
              <span>Expires {moment(offer.expiryDate).format('MMM DD, YYYY')}</span>
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center text-primary-600 dark:text-primary-400 font-semibold group/link">
              <span>View Offer</span>
              <FiExternalLink className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
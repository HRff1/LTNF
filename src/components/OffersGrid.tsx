import OfferCard from './OfferCard'

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

interface OffersGridProps {
  offers: Offer[]
  columns?: number
}

export default function OffersGrid({ offers, columns = 3 }: OffersGridProps) {
  const gridClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={`grid ${gridClasses[columns as keyof typeof gridClasses]} gap-6`}>
      {offers.map((offer) => (
        <OfferCard key={offer._id} offer={offer} />
      ))}
    </div>
  )
}
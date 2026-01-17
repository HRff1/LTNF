import { useState } from 'react'
import { FiMail, FiSend } from 'react-icons/fi'
import { toast } from 'react-toastify'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !isValidEmail(email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Successfully subscribed to our newsletter!')
      setEmail('')
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  return (
    <section className="py-16 bg-primary-600 dark:bg-primary-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FiMail className="w-16 h-16 text-white mx-auto mb-6" />
        
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Subscribe to Our Newsletter
        </h2>
        
        <p className="text-xl text-primary-100 dark:text-primary-200 mb-8">
          Get the latest news and exclusive offers delivered straight to your inbox
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex">
            <div className="relative flex-1">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-12 pr-4 py-4 rounded-l-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 text-gray-900"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-r-lg font-semibold transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Subscribe</span>
                  <FiSend className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
        
        <p className="text-sm text-primary-100 dark:text-primary-200 mt-4">
          No spam, unsubscribe at any time. We respect your privacy.
        </p>
      </div>
    </section>
  )
}
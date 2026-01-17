import Link from 'next/link'
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { href: '/news', label: 'Latest News' },
        { href: '/offers', label: 'Best Offers' },
        { href: '/categories', label: 'Categories' },
        { href: '/contact', label: 'Contact Us' },
      ],
    },
    {
      title: 'Categories',
      links: [
        { href: '/categories/technology', label: 'Technology' },
        { href: '/categories/business', label: 'Business' },
        { href: '/categories/lifestyle', label: 'Lifestyle' },
        { href: '/categories/health', label: 'Health' },
      ],
    },
    {
      title: 'Support',
      links: [
        { href: '/about', label: 'About Us' },
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/faq', label: 'FAQ' },
      ],
    },
  ]

  const socialLinks = [
    { href: '#', icon: FiFacebook, label: 'Facebook' },
    { href: '#', icon: FiTwitter, label: 'Twitter' },
    { href: '#', icon: FiInstagram, label: 'Instagram' },
    { href: '#', icon: FiYoutube, label: 'YouTube' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-primary-400">
                  News<span className="text-white">Offers</span>
                </span>
              </Link>
              <p className="text-gray-400 leading-relaxed">
                Your trusted source for the latest news and best offers. 
                Stay updated with trending stories and exclusive deals.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <FiMail className="w-5 h-5 text-primary-400" />
              <span className="text-gray-400">contact@newsoffers.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <FiPhone className="w-5 h-5 text-primary-400" />
              <span className="text-gray-400">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <FiMapPin className="w-5 h-5 text-primary-400" />
              <span className="text-gray-400">New York, NY 10001</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 py-6">
          <div className="text-center">
            <p className="text-gray-400">
              © {currentYear} NewsOffers. All rights reserved. | 
              Designed with ❤️ for the modern reader
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
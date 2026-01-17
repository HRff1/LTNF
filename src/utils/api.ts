import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// News APIs
export const getLatestNews = async (limit = 10, page = 1) => {
  const response = await api.get(`/news?limit=${limit}&page=${page}`)
  return response.data
}

export const getNewsBySlug = async (slug: string) => {
  const response = await api.get(`/news/${slug}`)
  return response.data
}

export const getTrendingNews = async (limit = 5) => {
  const response = await api.get(`/news/trending?limit=${limit}`)
  return response.data
}

export const getNewsByCategory = async (category: string, limit = 10, page = 1) => {
  const response = await api.get(`/news/category/${category}?limit=${limit}&page=${page}`)
  return response.data
}

export const incrementNewsView = async (id: string) => {
  const response = await api.post(`/news/${id}/views`)
  return response.data
}

// Offers APIs
export const getLatestOffers = async (limit = 10, page = 1) => {
  const response = await api.get(`/offers?limit=${limit}&page=${page}`)
  return response.data
}

export const getOfferBySlug = async (slug: string) => {
  const response = await api.get(`/offers/${slug}`)
  return response.data
}

export const getFeaturedOffers = async (limit = 5) => {
  const response = await api.get(`/offers/featured?limit=${limit}`)
  return response.data
}

export const getOffersByCategory = async (category: string, limit = 10, page = 1) => {
  const response = await api.get(`/offers/category/${category}?limit=${limit}&page=${page}`)
  return response.data
}

export const incrementOfferView = async (id: string) => {
  const response = await api.post(`/offers/${id}/views`)
  return response.data
}

// Categories APIs
export const getAllCategories = async () => {
  const response = await api.get('/categories')
  return response.data
}

// Search APIs
export const searchContent = async (query: string, type?: string) => {
  const response = await api.get(`/search?q=${encodeURIComponent(query)}${type ? `&type=${type}` : ''}`)
  return response.data
}

// Contact APIs
export const submitContact = async (data: {
  name: string
  email: string
  subject: string
  message: string
}) => {
  const response = await api.post('/contact', data)
  return response.data
}

// Admin APIs (require authentication)
export const adminLogin = async (credentials: {
  email: string
  password: string
}) => {
  const response = await api.post('/auth/login', credentials)
  return response.data
}

export const adminRegister = async (data: {
  username: string
  email: string
  password: string
}) => {
  const response = await api.post('/auth/register', data)
  return response.data
}

export const getCurrentUser = async (token: string) => {
  const response = await api.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

// Admin News APIs
export const createNews = async (data: FormData, token: string) => {
  const response = await api.post('/admin/news', data, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const updateNews = async (id: string, data: FormData, token: string) => {
  const response = await api.put(`/admin/news/${id}`, data, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const deleteNews = async (id: string, token: string) => {
  const response = await api.delete(`/admin/news/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

// Admin Offers APIs
export const createOffer = async (data: FormData, token: string) => {
  const response = await api.post('/admin/offers', data, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const updateOffer = async (id: string, data: FormData, token: string) => {
  const response = await api.put(`/admin/offers/${id}`, data, {
    headers: { 
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export const deleteOffer = async (id: string, token: string) => {
  const response = await api.delete(`/admin/offers/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

// Admin Categories APIs
export const createCategory = async (data: any, token: string) => {
  const response = await api.post('/admin/categories', data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export const updateCategory = async (id: string, data: any, token: string) => {
  const response = await api.put(`/admin/categories/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export const deleteCategory = async (id: string, token: string) => {
  const response = await api.delete(`/admin/categories/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

// Admin Contact APIs
export const getAllContactMessages = async (token: string) => {
  const response = await api.get('/admin/contact', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export const updateContactMessageStatus = async (id: string, status: string, token: string) => {
  const response = await api.put(`/admin/contact/${id}`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}
// utils/fetchData.js
// Modular JavaScript - ES6 modules as professor specified

import { mockUsers } from './mockData.js'

export const fetchData = async (url) => {
    try {
        // Try the new API first
        const apiUrl = url.includes('localhost') || url.includes('onrender.com') 
            ? `${url}/users` 
            : url
            
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Handle new API format
        if (data.success && data.data) {
            console.log('✅ Using real API data')
            return data
        }
        
        // Fallback to mock data
        console.log('⚠️ API response format unexpected, using mock data')
        return mockUsers
        
    } catch (error) {
        console.log('❌ API request failed, using mock data:', error.message)
        // Return mock data when API fails (as professor suggested)
        return mockUsers
    }
}

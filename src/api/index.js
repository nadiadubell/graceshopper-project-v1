export const BASE = 'http://localhost:4000/api'

export const getOrderHistoryById = async(userId) => {
  const userOrderHistory = await axios.get(`${BASE}/users/:username/profile`)
}


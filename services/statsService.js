import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL;

export const statsService = {
  getStats: async () => {
    const res = await axios.get(`${API}/stats`);
    return res.data;
  },
};

import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL;

export const stationService = {
  getAll: async () => {
    const res = await axios.get(`${API}/stations`);
    return res.data.data;
  },

  search: async (search) => {
    const res = await axios.get(`${API}/stations`, {
      params: { search },
    });

    return res.data.data;
  },
};

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

export const login = async (user_id: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}login/`, { user_id, password });
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('designation', response.data.designation)
      localStorage.setItem("name", response.data.name)
      localStorage.setItem('facility', response.data.facility)
      return response.data.redirect;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${API_URL}logout/`, {}, {
      headers: {
        'Authorization': `Token ${token}`
      }
    });
    localStorage.removeItem('token');
    localStorage.removeItem('designation')
    localStorage.removeItem('name')
    localStorage.removeItem('facility')
  } catch (error) {
    console.error('Logout error:', error);
  }
};

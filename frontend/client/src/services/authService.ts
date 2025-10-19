import api from './api';
import axios from 'axios';

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const authService = {
  async login(data: LoginData) {
    try {
      const response = await api.post('/auth/login', data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      // Modo demo quando não há backend disponível
      if (axios.isAxiosError(error) && (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error'))) {
        return this.demoLogin(data);
      }
      throw error;
    }
  },

  async register(data: RegisterData) {
    try {
      const response = await api.post('/auth/register', data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error: any) {
      // Modo demo quando não há backend disponível
      if (axios.isAxiosError(error) && (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error'))) {
        return this.demoRegister(data);
      }
      throw error;
    }
  },

  // Modo demo para quando não há backend
  demoLogin(data: LoginData) {
    const demoUser = {
      id: 'demo-user-1',
      username: data.username,
      email: `${data.username}@demo.com`
    };
    const demoToken = 'demo-token-' + Date.now();
    
    localStorage.setItem('token', demoToken);
    localStorage.setItem('user', JSON.stringify(demoUser));
    localStorage.setItem('demoMode', 'true');
    
    return {
      success: true,
      message: 'Login realizado com sucesso (Modo Demo)',
      user: demoUser,
      token: demoToken
    };
  },

  // Entrada rápida sem cadastro
  quickLogin() {
    const randomId = Math.random().toString(36).substr(2, 9);
    const quickUser = {
      id: `quick-user-${randomId}`,
      username: `Jogador${randomId}`,
      email: `jogador${randomId}@demo.com`
    };
    const quickToken = 'quick-token-' + Date.now();
    
    localStorage.setItem('token', quickToken);
    localStorage.setItem('user', JSON.stringify(quickUser));
    localStorage.setItem('demoMode', 'true');
    localStorage.setItem('quickMode', 'true');
    
    return {
      success: true,
      message: 'Entrada rápida realizada com sucesso!',
      user: quickUser,
      token: quickToken
    };
  },

  demoRegister(data: RegisterData) {
    const demoUser = {
      id: 'demo-user-' + Date.now(),
      username: data.username,
      email: data.email
    };
    const demoToken = 'demo-token-' + Date.now();
    
    localStorage.setItem('token', demoToken);
    localStorage.setItem('user', JSON.stringify(demoUser));
    localStorage.setItem('demoMode', 'true');
    
    return {
      success: true,
      message: 'Registro realizado com sucesso (Modo Demo)',
      user: demoUser,
      token: demoToken
    };
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  isDemoMode(): boolean {
    return localStorage.getItem('demoMode') === 'true';
  },

  isQuickMode(): boolean {
    return localStorage.getItem('quickMode') === 'true';
  }
};
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const cookiesStr = document.cookie.split(';');
  const cookieTokenStr = cookiesStr.find((str) => {
    const [key] = str.split('=');
    return key.trim() === 'token';
  });

  if (!cookieTokenStr) {
    throw new Error('No estás autorizado');
  }

  const [, token] = cookieTokenStr.split('=');

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Error al cargar datos');
  }

  return response.json();
};


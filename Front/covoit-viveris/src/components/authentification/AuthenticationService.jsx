export const loginUser = async (username, password) => {
  const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('authToken', token);
      return true;
  } else {
      return false;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('authToken');
};
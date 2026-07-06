const fetch = global.fetch || require('node-fetch');
(async () => {
  try {
    const email = `testuser${Date.now()}@example.com`;
    const register = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email, password: 'Pass1234' })
    });
    const regData = await register.json();
    console.log('register', register.status, JSON.stringify(regData));

    const login = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: 'Pass1234' })
    });
    const loginData = await login.json();
    console.log('login', login.status, JSON.stringify(loginData));

    const token = loginData.token;
    const addShow = await fetch('http://localhost:5000/api/shows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify({ title: 'Test Show', platform: 'Netflix', image: 'https://example.com/test.jpg', status: 'planned' })
    });
    const showData = await addShow.json();
    console.log('add show', addShow.status, JSON.stringify(showData));

    const addMovie = await fetch('http://localhost:5000/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify({ title: 'Test Movie', platform: 'Netflix', image: 'https://example.com/test.jpg', status: 'planned' })
    });
    const movieData = await addMovie.json();
    console.log('add movie', addMovie.status, JSON.stringify(movieData));
  } catch (e) {
    console.error('ERROR', e);
  }
})();
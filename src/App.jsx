import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const searchMovies = async (searchQuery) => {
    // 1. Boşsa aramayı durdur
    if (!searchQuery.trim()) return;

    // 2. api çağırma
    try {
      setLoading(true);
      setError(null);
      const url = `https://www.omdbapi.com/?apikey=40e7551&s=${searchQuery}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "False") {
        setError(data.Error); // api'nin hata mesajı
        setMovies([]);
        setLoading(false);
        return;
      }

      setMovies(data.Search || []);
      setError(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Filmler yüklenirken bir hata oluştu...");
    }
  };

  const handleMovieClick = async (movieId) => {
    console.log("Tıklanan film ID:", movieId);

    try {
      const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
      const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`;
      const response = await fetch(url);
      const data = await response.json();

      console.log("Film detayı:", data);

      if (data.Response === "False") {
        console.error("Film detayı bulunamadı...");
        return;
      }

      setSelectedMovie(data);
    } catch (error) {
      console.error("Film detayı yüklenirken hata:", error);
    }
  };

  return (
    <div className='app'>
      <h1>🎬Film Arama</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={searchMovies}
      />

      {loading && <p>Yükleniyor...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && movies.length > 0 && (
        <MovieList
          movies={movies}
          onMovieClick={handleMovieClick}
        />
      )}

      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {!loading && !error && movies.length === 0 && searchTerm && (
        <p>Film bulunamadı</p>
      )}
    </div>
  )
}

export default App

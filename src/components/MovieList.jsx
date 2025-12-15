import MovieCard from './MovieCard';

function MovieList({ movies, onMovieClick }) {
    return (
        <div className='movie-list'>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    onClick={() => onMovieClick(movie.imdbID)}
                />
            ))}
        </div>
    )
}

export default MovieList;
function MovieDetail({ movie, onClose }) {
  if (!movie) return null;  // Movie yoksa hiçbir şey gösterme
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✕</button>
        
        <div className="detail-container">
          <img src={movie.Poster} alt={movie.Title} />
          
          <div className="detail-info">
            <h2>{movie.Title}</h2>
            <p><strong>Yıl:</strong> {movie.Year}</p>
            <p><strong>IMDb:</strong> {movie.imdbRating}</p>
            <p><strong>Yönetmen:</strong> {movie.Director}</p>
            <p><strong>Oyuncular:</strong> {movie.Actors}</p>
            <p><strong>Açıklama:</strong> {movie.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
    const handleSubmit = (e) => {
        e.preventDefault(); // Form submiti engelleme
        onSearch(searchTerm); // Aramayı başlatma
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Film ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Ara</button>
        </form>
    )
}

export default SearchBar;
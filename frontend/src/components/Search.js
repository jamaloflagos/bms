const Search = ({onChange, resetSearch}) => {
  
  return (
    <div>
        <div className="search"> 
            <div style={{display: "inline"}} onClick={resetSearch}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <input 
                type="text" 
                placeholder="Search by Book Name/Author/Publisher?category"
                onChange={onChange}
            />
            <i className="fa-solid fa-xmark"></i>
        </div>

    </div>
  )
}
export default Search
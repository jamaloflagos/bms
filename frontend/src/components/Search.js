import { useState } from "react"



const Search = ({onChange}) => {
  const [error, setError] = useState("");
  

  

  return (
    <div>
        <div> 
            <i className="fa-solid fa-magnifying-glass"></i>
            <input 
                type="text" 
                placeholder="Search by Book Name/Author/Publisher?category"
                onChange={onChange}
            />
            <i className="fa-thin fa-xmark"></i>
        </div>

        {error && <h1>{error}</h1>}
    </div>
  )
}
export default Search
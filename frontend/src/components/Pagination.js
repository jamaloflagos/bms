const Pagination = ({totalBook, booksPerPage, paginate, setCurrentPage, currentPage}) => {
    const pageNumbers = [];
    const nPage = Math.ceil(totalBook.length / booksPerPage);
    for(let i = 1; i <= nPage; i++) {
        pageNumbers.push(i)
    }

    console.log("pagination rendered", totalBook, booksPerPage);
    console.log(pageNumbers, nPage);
    
    const prev = () => {
        if(currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    const next = () => {
        if(currentPage !== nPage) {
            setCurrentPage(currentPage + 1)
        }
    }
    
  return (
    <nav>
        <ul>
        <button onClick={prev}>Prev</button>
            {
                pageNumbers.map( number => {
                    return (
                        <li key={number}>
                            <button onClick={() => paginate(number)}>{number}</button>
                        </li>
                    )
                })
            }
        <button onClick={next}>Next</button>
        </ul>
    </nav>
  )
}
export default Pagination
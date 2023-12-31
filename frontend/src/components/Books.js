import { useNavigate } from "react-router-dom"

const Books = ({books}) => {
  const navigate = useNavigate()
  const link = (id) => navigate(`/${id}`)

  // if(books.length === 0) {
  //   return <h1>No such book</h1>
  // }

  return (
    <>
        <table>
         <thead>
          <tr style={{backgroundColor: "#ddd"}}>
                <td>Name</td>
                <td>Author</td>
                <td>Publisher</td>
                <td>Category</td>
            </tr>
         </thead>
        <tbody>
         
            {
                books.map( book => {
                  return (
                    <tr key={book._id} onClick={() => link(book._id)}>
                        <td>
                          {book.name}
                        </td>
                        <td>
                          {book.author.name}
                        </td>
                        <td>
                          {book.publisher.name}
                        </td>
                        <td>
                          {book.category.name}
                        </td>
                        
                    </tr>
                  )
                })
              }
        </tbody>
        </table>
    </>
  )
}
export default Books
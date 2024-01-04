import { Link } from "react-router-dom"

const Authors = ({name, description, gender, position, dob, yod, id}) => {
  return (
    <div>
        <Link to={`/author/${id}`}>
          <h1>{name}</h1>
        </Link>
    </div>
  )
}
export default Authors
import { Link } from "react-router-dom"
const Publishers = ({name, eamil, phone, country, gender, id}) => {
  return (
    <div>
      <Link to={`/${id}`}>{name}</Link>
    </div>
  )
}
export default Publishers
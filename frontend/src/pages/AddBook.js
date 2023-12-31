import { useForm } from "../hooks/useForm"
import { useFormSubmit } from "../hooks/useFormSubmit";

const AddBook = () => {
    const url = 'https://bms-server-ashy.vercel.app/book/add'
    const data = {
        book_name: "",
        nickname: "",
        status: "",
        author_name: "",
        author_desc: "",
        gender: "",
        dob: "",
        yod: "",
        position: "",
        category_name: "",
        category_desc: "",
        publisher_name: "",
        address: "",
        email: "",
        phone: "",
        country: ""
    }
    const [ error, handleSubmit ] = useFormSubmit(url);
    const [ formData, onChange ] = useForm(data);
    console.log(formData);
    
  return (
    <div>
        <form onSubmit={(e) => handleSubmit(e, formData)}>

            <fieldset>
                <legend>Book Details</legend>

                <label htmlFor="book_name">Book Name</label>
                <input 
                    type="text"
                    name="book_name"
                    id="book_name"
                    value={formData.book_name}
                    onChange={onChange}
                />
                
                <br />

                <label htmlFor="nickname">Nickname</label>
                <input 
                    type="text"
                    name="nickname"
                    id="nickname"
                    value={formData.nickname}
                    onChange={onChange}
                />

                <br />

                <label htmlFor="status">Status</label>
                <input 
                    type="text"
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={onChange}
                />
            </fieldset>

            <fieldset>
                <legend>Author Details</legend>

                <label htmlFor="author_name">Author Name</label>
                <input 
                    type="text"
                    name="author_name"
                    id="author_name"
                    value={formData.author_name}
                    onChange={onChange}
                />

                <br />

                <label htmlFor="author_desc">Author Description</label>
                <input 
                    type="text"
                    name="author_desc"
                    id="author_desc"
                    value={formData.author_desc}
                    onChange={onChange}
                />

                <br />

                <label htmlFor="gender">Gender</label>
                <input 
                    type="text"
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={onChange}
                />

                <br />

                <label htmlFor="dob">DOB</label>
                <input 
                    type="text"
                    name="dob"
                    id="dob"
                    value={formData.dob}
                    onChange={onChange}
                />

                <br />

                <label htmlFor="yod">YOD</label>
                <input 
                    type="text"
                    name="yod"
                    id="yod"
                    value={formData.yod}
                    onChange={onChange}
                />

                <br />

                <label htmlFor="position">Position</label>
                <input 
                    type="text"
                    name="position"
                    id="position"
                    value={formData.position}
                    onChange={onChange}
                />
            </fieldset>

            <fieldset>
                <legend>Publisher Details</legend>

                <label htmlFor="publisher_name">Publisher Name</label>
                <input 
                    type="text"
                    name="publisher_name"
                    id="publisher_name"
                    value={formData.publisher_name}
                    onChange={onChange}
                />

                <br />

                <label htmlFor="address">Address</label>
                <input 
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={onChange}
                />

                <br />

                <label htmlFor="email">Email</label>
                <input 
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={onChange}
                />

                <br />

                <label htmlFor="phone">Phone</label>
                <input 
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={onChange}
                />

                <br />

                <label htmlFor="country">Country</label>
                <input 
                    type="text"
                    name="country"
                    id="country"
                    value={formData.country}
                    onChange={onChange}
                />
            </fieldset>

            <fieldset>
                <legend>Category Details</legend>

                <label htmlFor="category_name">Category Name</label>
                <input 
                    type="text"
                    name="category_name"
                    id="category_name"
                    value={formData.category_name}
                    onChange={onChange}
                />

                <br />

                <label htmlFor="category_desc">Category Description</label>
                <input 
                    type="text"
                    name="category_desc"
                    id="category_desc"
                    value={formData.category_desc}
                    onChange={onChange}
                />
            </fieldset>
            
            {error && <h1>{error}</h1>}
            <button type="submit">Add</button>
        </form>
    </div>
  )
}
export default AddBook
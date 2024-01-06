import { useAuthor } from "../../hooks/useAuthor";
import { usePublisher } from "../../hooks/usePublisher";
import { useForm } from "../../hooks/useForm";
import { useFormSubmit } from "../../hooks/useFormSubmit";

const AddBook = () => {
    const { authorsName } = useAuthor(); 
    const { publishersName } = usePublisher(); 
    console.log(authorsName, publishersName);
    

    const url = 'https://bms-server-ashy.vercel.app/book'
    const to = "/"
    const dispatchType = "ADD_BOOK"
    const data = {
        name: "",
        nickname: "",
        status: "",
        author: "",
        publisher: "",
    }
    const [ error, handleSubmit, isLoading ] = useFormSubmit(url);
    const [ formData, onChange ] = useForm(data);
    
  return (
    <div>
        <form onSubmit={(e) => handleSubmit(e, formData, to, dispatchType)}>

                <legend>Book Details</legend>

                <label htmlFor="name">Name</label>
                <input 
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
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

                <br />
                <label htmlFor="author">Author Name</label>
                <select 
                     name="author"
                     id="author"
                     onChange={onChange}
                >
                    <option value="">Choose</option>
                    {authorsName && authorsName.map(author => (
                        <option value={author._id} key={author._id}>{author.name}</option>
                    ))}
                </select>

                <br />
                <label htmlFor="publisher">Publisher Name</label>
                <select 
                    name="publisher"
                    id="publisher"
                    onChange={onChange}
                >
                    <option value="">Choose</option>
                    {publishersName && publishersName.map(publisher => (
                        <option value={publisher._id} key={publisher._id}>{publisher.name}</option>
                    ))}
                </select>
            
            {error && <h1>{error}</h1>}
            <button type="submit" disabled={isLoading}>Add</button>
        </form>
    </div>
  )
}
export default AddBook
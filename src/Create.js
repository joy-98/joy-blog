import { useState } from "react";
const Create = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [author, setAuthor] = useState('mario')
    const [isPending, setIsPending] = useState(false)

    const handleSubmit = (evt) => {
        evt.preventDefault()
        const blog = { title, body, author }
        setIsPending(true)

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added')
            setIsPending(false)
        })
    }

    return (
        <div className="create">
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <label>Blog body:</label>
                <textarea
                    required
                    value={body}
                    onChange={event => setBody(event.target.value)}
                />
                <label>Blog author:</label>
                <select
                    onChange={(event) => setAuthor(event.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog</button>}
            </form>
        </div>
    );
}

export default Create;
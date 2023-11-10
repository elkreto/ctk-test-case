import API from "@/util/axios"
import { useState } from "react"

export default function Comment({data, setPosts}) {
    const {id, text, createdAt} = data
    const [inputMode, setInputMode] = useState(false)
    const [newText, setText] = useState(text)

    const date = new Date(createdAt)

    function handleInputMode() {
        setInputMode((mode) => !mode)
    }

    function handleNewText(e) {
        setText(e.target.value)
    }

    function handleEdit() {
        API.post('/api/comment', {
            id: id,
            text: newText
        })
        .then(({data}) => {
            console.log(data)

            setPosts((posts) => {
                return posts.map((post) => {
                    if(post.id == data.postId) {
                        post.comments = post.comments.map((comment) => {
                            if(comment.id == data.id){

                                return data
                            }
                            
                            return comment
                        })
                    }

                    return post
                })
            })

            setInputMode(false)
        })
    }

    function handleDelete() {
        API.delete('/api/comment', {
            data: {id: id}
        })
        .then(() => {
            setPosts((posts) => {
                return posts.map((post) => {
                    post.comments = post.comments.filter((comment) => comment.id != id)

                    return post
                })
            })
        })
    }

    return (
    <div className="bg-slate-800 flex flex-col w-full pl-2 pr-2 pt-1 border-solid border-2 border-slate-700 rounded-lg">
        <div className="pb-2">
            <span className="text-xs text-slate-400" >Created: {date.toDateString()}</span>
        </div>
        { inputMode ? <input onChange={handleNewText} value={newText} className="bg-transparent border-solid border-2 border-slate-700 rounded-lg p-1 w-full"></input> : <p className="text-lg pb-2">{text}</p>}
        <div className="inline-flex text-xs space-x-2 pb-1 text-slate-400 cursor-pointer">
            {inputMode ? 
            <div className="p-1 flex flex-row gap-3">
                <div onClick={handleEdit} className="hover:underline hover:text-slate-200" >Submit</div>
                <div onClick={() => setInputMode(false)} className="hover:underline hover:text-slate-200">Cancel</div>
            </div> 
            :
            <>
                <div onClick={handleDelete} className="hover:underline hover:text-slate-200">delete comment</div>
                <div onClick={handleInputMode} className="hover:underline hover:text-slate-200">edit comment</div>
            </> }
        </div>
    </div>
    )
}
import Comment from "./comment"
import API from "@/util/axios"
import { useState } from "react"

export default function Post({data, setPosts}) {
    const {id, title, text, createdAt, comments} = data
    const [inputMode, setInputMode] = useState(false)
    const [addCommentMode, setAddCommentMode] = useState(false)
    const [newCommentText, setNewCommentText] = useState('')
    const [newTitle, setTitle] = useState(title)
    const [newText, setText] = useState(text)

    const date = new Date(createdAt)

    function handleInputMode() {
        setInputMode((mode) => !mode)
    }

    function handleAddCommentTextChange(e) {
        setNewCommentText(e.target.value)
    }
 
    function handleCreateComment() {
        API.put('/api/comment', {
            postId: id,
            text: newCommentText
        })
        .then(({data}) => {
            comments.push(data)
            
            setAddCommentMode(false)
            setNewCommentText('')
        })
    }

    function handleTitleChange(e) {
        setTitle(e.target.value)
    }

    function handleTextChange(e) {
        setText(e.target.value)
    }

    function handleEdit() {
        API.post('/api/post', {
            id: id,
            title: newTitle,
            text: newText
        }) 
        .then(({data}) => {
            setPosts((posts) => {
                return posts.map((post) => post.id == id ? data : post)
            })
            setInputMode(false)
        }) 
    }

    function handleDelete() {
        API.delete('/api/post', {
            data: {id: id}
        })
        .then(() => {
            setPosts((posts) => {
                return posts.filter((p) => p.id != id)
            })
        })
    }

    return (
    <div className="bg-slate-900 flex flex-col gap-2 w-1/3 min-w-[20rem] p-2 border-solid border-2 border-slate-800 rounded-lg">
        <div className="border-solid border-2 border-slate-700 rounded-lg p-2">
            <div className="pb-2 flex flex-col gap-2">
                { inputMode ? <input onChange={handleTitleChange} className="text-2xl pb-0 font-bold border-solid border-2 border-slate-800 bg-transparent rounded-lg p-1" name="title" value={newTitle}></input>  : <a href={`/post/${id}`}><h2 className="text-2xl pb-0 font-bold hover:underline cursor-pointer" >{title}</h2></a>}
                <div className="text-xs text-slate-400" >Created: {date.toDateString()}</div>
            </div>
            { inputMode ? <textarea onChange={handleTextChange} className="h-40 text-lg pb-2 border-solid border-2 border-slate-800 bg-transparent rounded-lg p-1 w-full" name="text" value={newText}></textarea> : <p className="text-lg pb-2">{text}</p> }
            <div className="inline-flex text-xs space-x-2 pb-1 text-slate-400 cursor-pointer">
                { inputMode ?
                    <>  
                        <div onClick={handleEdit} className="hover:underline hover:text-slate-200" >Submit</div>
                        <div onClick={() => setInputMode(false)} className="hover:underline hover:text-slate-200">Cancel</div>
                    </>
                     :
                    <>
                        <div onClick={handleDelete} className="hover:underline hover:text-slate-200">delete post</div>
                        <div onClick={handleInputMode} className="hover:underline hover:text-slate-200">edit post</div>
                        <div onClick={() => setAddCommentMode(true)} className="hover:underline hover:text-slate-200">add comment</div>
                    </>
                }
            </div>
        </div>
        <div className="border-solid border-2 border-slate-700 rounded-lg pl-2 pr-2 pt-1 pb-2">
            <div className="text-s pb-1" >Comments:</div>
            { addCommentMode ? 
                <>
                    <input className="border-solid border-2 border-slate-800 bg-transparent rounded-lg p-1 w-full" onChange={handleAddCommentTextChange} value={newCommentText}></input>
                    <div onClick={handleCreateComment} className="w-fit ml-auto text-xs text-slate-400 cursor-pointer hover:underline hover:text-slate-200 pt-2 pb-2">Create comment</div>
                </> 
                : undefined}
            <div className="flex flex-col gap-2">{comments.length ? comments.map((comment, i) => <Comment key={i} data={comment} setPosts={setPosts}></Comment> ) : <p className="text-xs ml-2 text-slate-400">No comments yet</p>}</div>
        </div>
    </div>
    )
}
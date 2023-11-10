"use client"
import API from "@/util/axios"
import { useEffect, useState} from "react"
import Loading from '@/components/loading'
import Post from "@/components/post"

export default function Home() {
  const [state, setState] = useState('loading')
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(0)
  const [inputMode, setInputMode] = useState(false)
  const [lastR, setLastR] = useState(0) 

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    API.get('/api/post/all', {params: {page: page}})
    .then((res) => { 
      setLastR(res.data.length)
      setPosts([...posts, ...res.data])
    })
    .then(() => setState('done'))
    .catch(() => {setState('error')})
  },[page])

  function loadNextPage(){
    setPage(page+1)
  }

  function handleCreateTitle(e) {
    setTitle(e.target.value)
  }

  function handleCreateText(e) {
    setText(e.target.value)
  }

  function handleCreate() {
    API.put('/api/post', {
      title: title,
      text: text
    })
    .then(({data}) => {
      setPosts([data, ...posts])
      setInputMode(false)
    })
  }

  if(state === 'loading') return <Loading></Loading>
  if(state === 'error') return <p>Error occured</p>

  return (
    <div className="w-full flex flex-col gap-5 justify-center items-center">
      {inputMode ?
        <div className="bg-slate-900 flex flex-col gap-2 w-1/3 min-w-[20rem] p-2 border-solid border-2 border-slate-800 rounded-lg">
          <div className="border-solid border-2 border-slate-700 rounded-lg p-2">
            <div className="flex flex-col gap-2">
              <input onChange={handleCreateTitle} className="text-2xl pb-0 font-bold border-solid border-2 border-slate-800 bg-transparent rounded-lg p-1" placeholder="Title" value={title}></input>
              <textarea onChange={handleCreateText} className="h-40 text-lg pb-2 border-solid border-2 border-slate-800 bg-transparent rounded-lg p-1 w-full" placeholder="text" value={text}></textarea>
            <div className="m-auto flex flex-row gap-1 text-xs pb-1 text-slate-400 cursor-pointer">
              <div onClick={handleCreate} className="hover:underline hover:text-slate-200">Submit</div>
              <div onClick={() => setInputMode(false)} className="hover:underline hover:text-slate-200">Cancel</div>
            </div> 
            </div>
          </div>
        </div>
        :
        <div onClick={() => setInputMode(true)} className="bg-slate-1000 flex justify-center gap-2 w-1/3 min-w-[20rem] p-2 border-solid border-2 border-slate-800 rounded-lg cursor-pointer hover:bg-slate-900 hover:underline font-bold">Create Post</div>
      }
      {posts.map((post, i) => <Post key={i} data={post} setPosts={setPosts}></Post>)}
      {lastR ? <div onClick={loadNextPage} className="text-s text-slate-500 mb-5 cursor-pointer hover:underline hover:text-slate-300">Load more</div> : <p className="mb-5">No more posts</p>}
    </div>
  )
}


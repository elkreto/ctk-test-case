"use client"
import API from "@/util/axios"
import { useEffect, useState} from "react"
import Loading from '@/components/loading'
import Post from "@/components/post"

export default function Page({ params }) {
    const {id} = params
    const [state, setState] = useState('loading')
    const [post, setPost] = useState([])

    useEffect(() => {
        API.get('/api/post', {params: {id: id}})
        .then((res) => setPost([res.data]))
        .then(() => setState('done'))
        .catch(() => {setState('error')})
    },[])

    if(state === 'loading') return <Loading/>
    if(state === 'error') return <p>Error occured</p>

    return <Post data={post[0]} setPosts={setPost}></Post>
}
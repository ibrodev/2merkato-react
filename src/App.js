import React, { useState, useEffect, ReactFragment } from 'react';
import axios from 'axios';
import Paginate from 'react-paginate';


function App() {
    const [posts, setPosts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)

    async function fetchPosts() {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            const posts = response.data;

            const slice = posts.slice(offset, offset + perPage)
            const postData = slice.map(post => < div key = { post.id } > < h1 > { post.title } < /h1> <p>{post.body}</p > < /div>);
                setPosts(postData); setPageCount(Math.ceil(posts.length / perPage))





            }
            catch (e) {
                console.log(e);
            }
        }

        useEffect(() => {
            fetchPosts()
        }, [offset])

        const handleClick = (e) => {
            const selectedPage = e.selected;
            setOffset(selectedPage + 1);
        }

        return ( <
            div className = "App" > { posts } <
            Paginate previousLabel = { "prev" }
            nextLabel = { "next" }
            breakLabel = { "..." }
            breakClassName = { "break-me" }
            pageCount = { pageCount }
            marginPagesDisplayed = { 2 }
            pageRangeDisplayed = { 5 }
            onPageChange = { handleClick }
            containerClassName = { "pagination" }
            subContainerClassName = { "pages pagination" }
            activeClassName = { "active" }
            />

            <
            /div>
        )
    }

    export default App
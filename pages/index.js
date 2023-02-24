import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const remove = async (data) => {
    let res = await fetch("/api/blogposts", {
      method: "DELETE",
      body: JSON.stringify({
        hash: data.hash
      }),
    });
    
    res = await res.json();
    if(res.deletedCount && res.deletedCount > 0) {
      alert('Removed successfuly');
      loadBlogPosts();
    }
  }

  const loadBlogPosts = async () => {
    
    let res = await fetch("/api/blogposts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let allPosts = await res.json();
    const _postListFromAPI = allPosts.data;
    
    setItems(_postListFromAPI)
  }

  return (
    <>
      <Head>
        <title>Softslick - CMS</title>
        <meta name="description" content="Softslick CMS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2>Softslick CMS</h2>

        <a href='/new'><button>New</button></a>
        <br/>
        <br/>

        <div className='blogTableBox'>
          <div className='bTBHeader'>
              <div className='bTBHTitle'><p>Title</p></div>
              <div className='bTBHHeadline'><p>Headline</p></div>
              <div className='bTBHBody'><p>Body</p></div>
              <div className='bTBHImage'><p>Image</p></div>
              <div className='bTBHActions'><p>Actions</p></div>
          </div>
          {
            items.map((item, i) => <div key={i} className='bTBBody'>
            <div className='bTBBTitle'><p>{item.title}</p></div>
            <div className='bTBBHeadline'><p>{item.headline}</p></div>
            <div className='bTBBBody'><p>{item.body}</p></div>
            <div className='bTBBImage'><p><img src={item.image}/></p></div>
            <div className='bTBBActions'><a href={`/edit?id=${item._id}&valid=true`}><button>Edit</button></a> <button onClick={() => remove({
              hash: item.hash
            })}>Remove</button></div>
        </div>)
          }
        </div>
      </main>
    </>
  )
}

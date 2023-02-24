import Head from 'next/head'
import { useEffect, useState } from 'react'


export default function Home() {
    const [title, setTitle] = useState('');
    const [headline, setHeadline] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');

    const [thisHash, setThisHash] = useState('')

    useEffect(() => {
      loadFromURL();
    }, []);

    const getSubstring = (string, char1, char2) => {
      return string.slice(
        string.indexOf(char1) + 3,
        string.lastIndexOf(char2),
      );
    }

    const loadFromURL = async () => {
      const queryString = window.location.search;
      var _article = getSubstring(queryString, 'id=', '&valid=true')
      
      let res = await fetch("/api/blogposts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let allPosts = await res.json();
      const _postListFromAPI = allPosts.data;

      const _thisPost = _postListFromAPI.filter(i => i._id == _article);

      if(_thisPost.length > 0) {
        setTitle(_thisPost[0].title);
        setHeadline(_thisPost[0].headline)
        setBody(_thisPost[0].body)
        setImage(_thisPost[0].image)
        setThisHash(_thisPost[0].hash)
      }else{
        history.back();
      }
    }

    const update = async () => {
      const queryString = window.location.search;
      var _article = getSubstring(queryString, 'id=', '&valid=true')
      
      let res = await fetch("/api/blogposts", {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          headline: headline,
          body: body,
          hash: thisHash,
          image: image
        }),
      });

      res = await res.json();
      console.log(res)
      if(res.matchedCount > 0) {
        var _checked = alert('Updated successfuly');
        history.back();
      }
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
        <h2>Softslick CMS - Edit article</h2>

        
        <a href='/'><button>Back</button></a>
        <br/>
        <br/>

        <label>Title:<br/> <input className='textField' type='text' value={title} onChange={(txt) => setTitle(txt.target.value)}></input></label>
        <br/>
        <br/>
        <label>Headline:<br/> <input className='textField' type='text' value={headline} onChange={(txt) => setHeadline(txt.target.value)}></input></label>
        <br/>
        <br/>
        <label>Image URL:<br/> <input className='textField' type='text' value={image} onChange={(txt) => setImage(txt.target.value)}></input></label>
        <br/>
        <br/>
        <label>Body:<br/> <textarea  rows={10} className='textField' type='text' value={body} onChange={(txt) => setBody(txt.target.value)}></textarea></label>
        <br/>
        <br/>
        <button onClick={() => update()}>Save</button>
      </main>
    </>
  )
}

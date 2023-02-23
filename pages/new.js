import Head from 'next/head'
import { useState } from 'react'


export default function Home() {
    const [title, setTitle] = useState('');
    const [headline, setHeadline] = useState('');
    const [body, setBody] = useState('');

    const save = async () => {
      if(title.length == 0 || headline.length == 0 || body.length == 0) {
        alert('One or more fields are empty');
        return;
      }

      let ans = "x".repeat(25)
             .replace(/./g, c => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 62) ] );

      let res = await fetch("/api/blogposts", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          headline: headline,
          body: body,
          hash: ans
        }),
      });

      res = await res.json();
      if(res._id != null) {
        var _checked = alert('Added successfuly');
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
        <h2>Softslick CMS - New article</h2>

        
        <a href='/'><button>Back</button></a>
        <br/>
        <br/>

        <label>Title:<br/> <input className='textField' type='text' value={title} onChange={(txt) => setTitle(txt.target.value)}></input></label>
        <br/>
        <br/>
        <label>Headline:<br/> <input className='textField' type='text' value={headline} onChange={(txt) => setHeadline(txt.target.value)}></input></label>
        <br/>
        <br/>
        <label>Body:<br/> <textarea  rows={10} className='textField' type='text' value={body} onChange={(txt) => setBody(txt.target.value)}></textarea></label>
        <br/>
        <br/>
        <button onClick={() => save()}>Save</button>
      </main>
    </>
  )
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  const [object, setObject] = useState({
    array: [],
    pageUrl: "https://pokeapi.co/api/v2/pokemon",
    nextPage: "",
    prevPage: "",
    loading: true
  })

  useEffect(() => {
    setObject({...object, loading: true })
    let cancel
    axios.get(object.pageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    .then(res => {
      setObject({
        ...object, 
        array: res.data.results.map(p => p.name),
        nextPage: res.data.next,
        prevPage: res.data.previous,
        loading: false
      })
    })
    .catch(e => {
      console.log('error')
    })

    return () => cancel()
  }, [object.pageUrl])

  function gotoNextPage() {
    setObject({...object, pageUrl: object.nextPage})
  }

  function gotoPrevPage() {
    setObject({...object, pageUrl: object.prevPage })
  }

  if (object.loading) return "Loading..."
  
  return (
    <>      
      {object.array.map(e => (
        <div key={e}>{e}</div>
      ))}
      <Pagination
        nextPage={object.nextPage ? gotoNextPage : null}
        prevPage={object.prevPage ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
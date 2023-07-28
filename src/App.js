
import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { auth, db,storage } from './config/firebase-config';
import { getDocs,collection,addDoc,deleteDoc,doc,updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
function App() {
  const [movieList,setMovieList] = useState([])
  const moviecollectionref = collection(db,"movies")
  const [title,settitle] = useState('')
  const [NewTile,setNewTile] = useState('')
    const [release,setrelease] = useState(0)
    const [isOscar,setisOscar] = useState(false)
    const [file,setFile] = useState(null)
  const getMoviesList = async () => {
    try {
      const data = await getDocs(moviecollectionref);
      const filteredData = data.docs.map((doc)=>({...doc.data(),id:doc.id}))
      setMovieList(filteredData)
      console.log(filteredData)
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    getMoviesList()
  },[])
  const submitMovie= async ()=>{
    try{
      await addDoc(moviecollectionref,{
        title:title,
        releaseDate: release,
        receivedAnoscar:isOscar,
        userId:auth?.currentUser?.uid,
      })
      getMoviesList()
    }catch(e){
      console.log(e)
    }
  }
  const updateMovieTitle = async (id) =>{
    const movieDoc = doc(db,"movies",id)
    await updateDoc(movieDoc,{title:NewTile});
    getMoviesList()
  }
  const deleteMovie = async (id) => {
    const movieDoc = doc(db,"movies",id)
    await deleteDoc(movieDoc);
    getMoviesList()
  }
  const uploadFile =async ()=>{
    if(!file) return;
    const fileFolderRef = ref(storage,`folder/${file.name}`);
    try{
      await uploadBytes(fileFolderRef,file)
    }catch(e){
      console.log(e)
    }
  }
  return (
    <div className="App">
      <Auth />
      <input  placeholder="movie title" value={title} onChange={(e)=>settitle(e.target.value)}/>
      <input  placeholder="release date ..." value={release} onChange={(e)=>setrelease(e.target.value)}/>
      <input type='checkbox' checked={isOscar} onChange={(e)=>setisOscar(Number(e.target.checked))}/>
      <label>received an Oscar</label>
      <button onClick={submitMovie}>submit Movie</button>
      <div>
        {
          movieList.map((item)=>(
            <div>
              <h1>{item.title}</h1>
              <p>{item.releaseDate}</p>
              <button onClick={()=>deleteMovie(item.id)}>delete movie</button>
              <input onChange={(e)=>setNewTile(e.target.value)} placeholder='new title'/>
              <button onClick={()=>updateMovieTitle(item.id)}>update movie</button>
            </div>
          ))
        }
      </div>
      <div>
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' />
        <button onClick={uploadFile}> Upload file</button>
      </div>
    </div>
  );
}

export default App;

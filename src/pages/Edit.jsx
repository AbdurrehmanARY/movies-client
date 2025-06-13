import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { editMovie, getAllMovies } from '@/store/moviesSlice'
import axios from 'axios'
import { Upload } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
function Edit() {
   const dispatch=useDispatch()
     const [uploading,setUploading]=useState(false)
     const [movie,setMovie]=useState({title:"",date:""})
     const [image,setImage]=useState('')
     const navigate=useNavigate()
     const { id } = useParams();
   
   const {listOfMovies}=useSelector((state)=>state.movies)

const movieDetail=listOfMovies.find(item=>item.id===Number(id))

 useEffect(() => {
    if (movieDetail) {
      setMovie({ title: movieDetail.title, date: movieDetail.date });
      setImage(movieDetail.movieImage);
    }
  }, [movieDetail]);



const handleImageUpload=async(e)=>{
    const file=e.target.files[0]
    
    const formData=new FormData()
    formData.append("movieImage", file);

    
    try {
      setUploading(true)
      const response = await axios.post(`http://localhost:8000/api/v1/movies/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type
        },
      })
      
      setImage(response.data.result)
      
    }
    catch (e) {
      console.log(e)

    }
    finally {
      setUploading(false)

    }
  }
const {title,date}=movie
   const handleChange=(e)=>{
          setMovie({ ...movie, [e.target.name]: e.target.value });
    }

    const handleSubmit=(e)=>{
  e.preventDefault()
  const {title,date}=movie
  const formData={title,date,image}
    dispatch(editMovie({ id, formData })).then((res)=>
    {

    if(res.payload.success){
      toast(res.payload.message)
      dispatch(getAllMovies())
      navigate('/')
    }
  }
    )
    }







  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-800 to-teal-900 relative overflow-hidden">
      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-teal-700/30 to-transparent">
        <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="rgba(45, 212, 191, 0.1)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-12">Edit</h1>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl">
          {/* Image Upload Area */}
          <div className="flex items-center justify-center">
              <label
  htmlFor='movieImage'
  className={`w-full max-w-md aspect-[3/4] border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors 
  `}
>
  {uploading ? (
  <Skeleton  className="h-full w-full"/>
) : image ? (
  <img
    src={image}
    alt="Uploaded"
    className="object-cover w-full h-full rounded-lg"
    style={{ maxHeight: "100%", maxWidth: "100%" }}
  />
) : (
  <>
    <Upload className="w-8 h-8 text-teal-300 mb-4" />
    <p className="text-teal-300 text-center">Drop an image here</p>
  </>
)}
  <input
    type="file"
    id="movieImage"
    name="movieImage"
    className="hidden"
    onChange={handleImageUpload}
  />
</label>
          </div>

          {/* Form */}
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Title"
                  value={title}
                  name="title"
                  onChange={handleChange}
                  className="bg-teal-800/50 border-teal-600 text-white placeholder:text-teal-300 h-12"
                  required
                />
              </div>

              <div>
                <Input
                  type="number"
                  placeholder="Publishing year"
                  name="date"
                  value={date}
                  onChange={handleChange}
                  className="bg-teal-800/50 border-teal-600 text-white placeholder:text-teal-300 h-12 w-48"
                  required
                />
              </div>

              <div className="flex gap-4 pt-8">
                <Button
                  type="button"
                  onClick={()=>navigate("/")}
               
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-800 px-8 h-12"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-8 h-12">
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit

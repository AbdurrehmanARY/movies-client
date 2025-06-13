import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LogOut, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '@/store/authSlice'
import { getAllMovies } from '@/store/moviesSlice'
import PaginationComp from '@/component/PaginationComp'


function Home() {
   const dispatch=useDispatch()
  const navigate=useNavigate()
       const [page, setPage] = useState(1);
   const {listOfMovies,totalPages}=useSelector((state)=>state.movies)
 
useEffect(() => {
  dispatch(getAllMovies(page))
}, [dispatch, page])

   const handleLogout = () => {
    dispatch(logoutUser())
  }


  return (



<>
      <div className="min-h-screen bg-gradient-to-br from-teal-800 to-teal-900 relative overflow-hidden ">
      {/* Decorative wave at bottom */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-teal-700/30 to-transparent">
        <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="rgba(45, 212, 191, 0.1)" />
        </svg>
      </div> */}

      {listOfMovies.length >0 ? 
      <div className="container mx-auto px-4 py-8 ">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold text-white">My movies</h1>
            <Button
              onClick={()=>navigate('/create')}
              size="icon"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-800 rounded-full w-8 h-8"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-white hover:bg-teal-700 flex items-center gap-2"
          >
            Logout
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
        
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 ">

          {  
          listOfMovies.map((movie) => (
            <Card
              key={movie.id}
              className="p-0.5 bg-teal-700/30 border-teal-600 cursor-pointer hover:bg-teal-700/50 transition-colors"
             
              onClick={()=>navigate(`/edit/${movie.id}`)}

            >
              <CardContent className="p-0">
                <div className="aspect-[3/4] relative mb-4">
                  <img
                    src={movie.movieImage }
                    alt={movie.title}
                    fill
                    className="h-full w-full bg-amber-600 rounded-t-lg"
                  />
                </div>
                <div className="px-4 pb-4">
                  <h3 className="text-white font-medium text-lg mb-1">{movie.title}</h3>
                  <p className="text-teal-300 text-sm">{movie.date}</p>
                </div>
              </CardContent>
            </Card>
          )) 
          }
        </div>
        <PaginationComp page={page} setPage={setPage} totalPages={totalPages} />
      </div>
      :
      <div className='text-white h-screen  flex flex-col justify-center items-center gap-4 '>
        <h1 className='text-5xl '>Your movie list is empty</h1>
        <button
        onClick={()=>navigate('/create')}
        className='p-4 bg-[#2BD17E] rounded-lg text-white'>Add new movies</button>
      </div>
      }

    </div>
</>       
  )
}
export default Home


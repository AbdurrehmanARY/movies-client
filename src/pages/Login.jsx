import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginUser } from '@/store/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function Login() {
   const [user,setUser]=useState({email:"",password:""})
   const dispatch=useDispatch()
   const navigate=useNavigate()
    const handleChange=(e)=>{
   setUser({ ...user, [e.target.name]: e.target.value });
    }
    const handleSubmit=(e)=>{
  e.preventDefault()
  const {email,password}=user
  const formData={email,password}
  dispatch(loginUser(formData)).then((res)=>{
    if(res.payload.success){
      return navigate('/')
      
    }
  })
  
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-800 to-teal-900 relative overflow-hidden">
      {/* Decorative wave at bottom */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-teal-700/30 to-transparent">
        <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" fill="rgba(45, 212, 191, 0.1)" />
        </svg>
      </div> */}

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-8">Sign in</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Email"
                name='email'
                // value={email}
                onChange={handleChange}
                className="bg-teal-800/50 border-teal-600 text-white placeholder:text-teal-300 h-12"
                required
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                name='password'
                // value={password}
                onChange={handleChange}
                className="bg-teal-800/50 border-teal-600 text-white placeholder:text-teal-300 h-12"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              {/* <Checkbox
                id="remember"
                // checked={rememberMe}
                // onCheckedChange={(checked) => setRememberMe(checked)}
                className="border-teal-400 data-[state=checked]:bg-teal-500"
              /> */}
              <label htmlFor="remember" className="text-teal-200 text-sm">
                Remember me
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium h-12 text-base"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

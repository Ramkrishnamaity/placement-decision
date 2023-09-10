import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { setLoader } from '../redux/slices/Loader'
import { endpoints } from '../services/apis'
import Spinner from '../components/Spinner'
import { apiConnector } from '../services/apiConnector'
import {  setUser } from '../redux/slices/profile'

const ApplyJob = () => {

  const location = useLocation()
  const id = location.pathname.split('/').at(-1)
  
  const {APPLY_JOB} =  endpoints
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user} = useSelector((state)=>state.profile)
  const token = useSelector((state)=>state.token.value)
  const loader = useSelector((state)=>state.loader.value)
  const {register, handleSubmit,reset, formState:{errors}} = useForm()
  const [image, setImage] = useState(null)


  function getData(data){
      let formD = new FormData()
      formD.append("jobId", id)
      formD.append("name", data.name)
      formD.append("email", data.email)
      formD.append("rollNo", data.rollNo)
      formD.append("regNo", data.regNo)
      formD.append("semester", data.semester)
      formD.append("year", data.year)
      formD.append("cgpa", data.cgpa)
      formD.append("secondary", data.secondary)
      formD.append("higher", data.higher)
      formD.append("dept", data.dept)
      formD.append('resume', image)
      return formD
  }
  

  async function submitHandler(formData){
    try{
      dispatch(setLoader(true))
      const {data} = await apiConnector("POST", APPLY_JOB, getData(formData) , {Authorization: `Bearer ${token}`})
      if(data.success){
        reset()
        dispatch(setUser(data.user))
        localStorage.setItem('user', JSON.stringify(data.user))
        dispatch(setLoader(false))
        navigate('/')
        toast.success(data.message)
      } else{
        dispatch(setLoader(false))
        toast.error(data.message)
      }
    } catch(error){
      reset()
      dispatch(setLoader(false))
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(
      Object.values(user?.jobs).find((v)=> v._id === id)
    ){
      navigate('/applied-job')
    }
  },[])


  return (
    loader? (<Spinner/>): (
      <div className='py-[50px] pt-[75px] min-h-screen '>
        <div className='w-[95%] sm:w-[90%] md:w-[80%] bg-softBlack flex flex-col items-center gap-8 pt-4 mx-auto pb-8'>
          <h1 className='text-richBlue text-2xl self-start ml-5'>Apply Job</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className='flex items-center gap-3 md:flex-row flex-col'>
              <div className='flex flex-col'>
                <label htmlFor='name'>Name
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='text'
                  name='name'
                  placeholder='Enter name'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("name", {required:true})}
                />
                {errors.name && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter name.
                </span>
              )}  
              </div>
              <div className='flex flex-col'>
                <label htmlFor='email'>Email
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='email'
                  name='email'
                  placeholder='enter email'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("email", {required:true})}
                /> 
                {errors.email && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter email.
                </span>
              )} 
              </div>
            </div>

            <div className='flex items-center gap-3 md:flex-row flex-col'>
              <div className='flex flex-col'>
                <label htmlFor='rollNo'>Roll No
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='number'
                  name='rollNo'
                  placeholder='enter roll no'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("rollNo", {required:true})}
                />
                {errors.rollNo && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter rollNo.
                </span>
              )}  
              </div>
              <div className='flex flex-col'>
                <label htmlFor='regNo'>Reg No
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='number'
                  name='regNo'
                  placeholder='enter reg no'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("regNo", {required:true})}
                /> 
                {errors.regNo && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please reg no.
                </span>
              )} 
              </div>
            </div>

            <div className='flex items-center gap-3 md:flex-row flex-col'>
              <div className='flex flex-col'>
                <label htmlFor='semester'>Semester
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='number'
                  name='semester'
                  max='8'
                  placeholder='Enter your semester'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("semester", {required:true})}
                />
                {errors.semester && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter semester.
                </span>
              )}  
              </div>
              <div className='flex flex-col'>
                <label htmlFor='year'>Year
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='number'
                  name='year'
                  placeholder='Enter year'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("year", {required:true})}
                /> 
                {errors.year && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter year.
                </span>
              )} 
              </div>
            </div>
            <div className='flex items-center gap-3 md:flex-row flex-col'>
              <div className='flex flex-col'>
                <label htmlFor='dept'>Department
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='text'
                  name='dept'
                  placeholder='Enter your dept'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("dept", {required:true})}
                />
                {errors.dept && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter dept.
                </span>
              )}  
              </div>
              <div className='flex flex-col'>
                <label htmlFor='cgpa'>CGPA
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='text'
                  name='cgpa'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("cgpa", {required:true})}
                /> 
                {errors.cgpa && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter cgpa.
                </span>
              )} 
              </div>
            </div>
            <div className='flex items-center gap-3 md:flex-row flex-col'>
              <div className='flex flex-col'>
                <label htmlFor='secondary'>Secondary result in %
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='text'
                  name='secondary'
                  placeholder='enter percentage'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("secondary", {required:true})}
                />
                {errors.secondary && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter result.
                </span>
              )}  
              </div>
              <div className='flex flex-col'>
                <label htmlFor='higher'>Higher S result in %
                <sup className='text-[#EF476F] text-md'>*</sup>
                </label>
                <input
                  type='text'
                  name='higher'
                  className='my-2 rounded-md py-2 px-5 outline-none'
                  {...register("higher", {required:true})}
                /> 
                {errors.higher && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter result.
                </span>
              )} 
              </div>
            </div>

            <div className='flex flex-col gap-3'>
            <label htmlFor='resume'>Resume in image file
                <sup className='text-[#EF476F] text-md'>*</sup>
            </label>
            <input
              type='file'
              name='resume'
              accept="image/*"
              onChange={(e)=>{setImage(e.target.files[0])}}
              required
            /> 
            </div>

            <div className='flex justify-center items-center'>
              <button className='text-[red] text-xl' type='submit'>
                Create
              </button>
            </div>

          </form>
        </div>
      </div>
    )
  )
}

export default ApplyJob
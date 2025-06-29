import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import EditCategory from '../components/EditCategory'
import CofirmBox from '../components/CofirmBox'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector, useDispatch } from 'react-redux'
import { setAllCategory } from '../store/productSlice'

const CategoryPage = () => {
    const dispatch = useDispatch()
    const [openUploadCategory,setOpenUploadCategory] = useState(false)
    const [loading,setLoading] = useState(false)
    const [categoryData,setCategoryData] = useState([])
    const [openEdit,setOpenEdit] = useState(false)
    const [editData,setEditData] = useState({
        name : "",
        image : "",
    })
    const [openConfimBoxDelete,setOpenConfirmBoxDelete] = useState(false)
    const [deleteCategory,setDeleteCategory] = useState({
        _id : ""
    })
    // const allCategory = useSelector(state => state.product.allCategory)


    // useEffect(()=>{
    //     setCategoryData(allCategory)
    // },[allCategory])
    
    const fetchCategory = async()=>{
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getCategory
            })
            const { data : responseData } = response

            if(responseData.success){
                setCategoryData(responseData.data)
                // Update Redux store with sorted categories
                dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))))
            }
        } catch (error) {
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchCategory()
    },[])

    const handleDeleteCategory = async()=>{
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data : deleteCategory
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                fetchCategory()
                setOpenConfirmBoxDelete(false)
                // Redux store will be updated by fetchCategory() which now dispatches setAllCategory
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

  return (
    <section className=''>
        <div className='p-2   bg-white shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Category</h2>
            <button onClick={()=>setOpenUploadCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Category</button>
        </div>
        {
            !categoryData[0] && !loading && (
                <NoData/>
            )
        }

        <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4'>
            {
                categoryData.map((category,index)=>{
                    return(
                        <div className='group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden' key={category._id}>
                            <div className='relative overflow-hidden'>
                                <img 
                                    alt={category.name}
                                    src={category.image}
                                    className='w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110'
                                />
                                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                            </div>
                            <div className='p-3'>
                                <h3 className='font-semibold text-gray-800 text-sm truncate mb-3 text-center' title={category.name}>
                                    {category.name}
                                </h3>
                                <div className='flex gap-2'>
                                    <button 
                                        onClick={()=>{
                                            setOpenEdit(true)
                                            setEditData(category)
                                        }} 
                                        className='flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-3 rounded-md text-xs transition-all duration-200 transform hover:scale-105 shadow-sm'
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={()=>{
                                            setOpenConfirmBoxDelete(true)
                                            setDeleteCategory(category)
                                        }} 
                                        className='flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2 px-3 rounded-md text-xs transition-all duration-200 transform hover:scale-105 shadow-sm'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>

        {
            loading && (
                <Loading/>
            )
        }

        {
            openUploadCategory && (
                <UploadCategoryModel fetchData={fetchCategory} close={()=>setOpenUploadCategory(false)}/>
            )
        }

        {
            openEdit && (
                <EditCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchCategory}/>
            )
        }

        {
           openConfimBoxDelete && (
            <CofirmBox close={()=>setOpenConfirmBoxDelete(false)} cancel={()=>setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory}/>
           ) 
        }
    </section>
  )
}

export default CategoryPage

import React from 'react'
import banner from '../assets/banner.png'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import {Link, useNavigate} from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id,cat)=>{
      console.log(id,cat)
      const subcategory = subCategoryData.find(sub =>{
        const filterData = sub.category.some(c => {
          return c._id == id
        })

        return filterData ? true : null
      })
      const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`

      navigate(url)
      console.log(url)
  }


  return (
   <section className='bg-white'>
      <div className='container mx-auto'>
          <div className={`w-full h-full min-h-48 bg-blue-100 rounded ${!banner && "animate-pulse my-2" } `}>
              <img
                src={banner}
                className='w-full h-full hidden lg:block'
                alt='banner' 
              />
              <img
                src={bannerMobile}
                className='w-full h-full lg:hidden'
                alt='banner' 
              />
          </div>
      </div>
      
      <div className='container mx-auto px-4 my-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6'>
          {
            loadingCategory ? (
              new Array(12).fill(null).map((c,index)=>{
                return(
                  <div key={index+"loadingcategory"} className='bg-white rounded-xl p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                    <div className='bg-blue-100 min-h-24 rounded-xl'></div>
                    <div className='bg-blue-100 h-8 rounded-xl'></div>
                  </div>
                )
              })
            ) : (
              categoryData.map((cat,index)=>{
                return(
                  <div
                    key={cat._id+"displayCategory"}
                    className='w-full h-full cursor-pointer group transition-all duration-300'
                    onClick={()=>handleRedirectProductListpage(cat._id,cat.name)}
                  >
                    <div className='bg-gradient-to-t from-green-100 to-white rounded-xl shadow-md group-hover:shadow-xl p-4 flex flex-col items-center transition-all duration-300 group-hover:-translate-y-1'>
                        <img 
                          src={cat.image}
                          className='w-20 h-20 object-contain mb-3 drop-shadow-md transition-transform duration-300 group-hover:scale-110'
                          alt={cat.name}
                        />
                        <div className='w-full text-center'>
                          <span className='block font-semibold text-gray-800 text-sm truncate' title={cat.name}>{cat.name}</span>
                        </div>
                    </div>
                  </div>
                )
              })
            )
          }
      </div>

      {/***display category product */}
      {
        categoryData?.map((c,index)=>{
          return(
            <CategoryWiseProductDisplay 
              key={c?._id+"CategorywiseProduct"} 
              id={c?._id} 
              name={c?.name}
            />
          )
        })
      }



   </section>
  )
}

export default Home

import React, { useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom'

const VerifyEmailOtp = () => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.verify_email_otp,
                data: { email, otp }
            })
            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/login')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Verification failed")
        }
    }

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-md mx-auto rounded p-7'>
                <h2 className='text-xl font-semibold mb-4'>Verify Your Email</h2>
                <form className='grid gap-4' onSubmit={handleSubmit}>
                    <label>
                        Enter the OTP sent to <span className='font-semibold'>{email}</span>:
                    </label>
                    <input
                        type="text"
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        required
                        className='bg-blue-50 p-2 border rounded outline-none'
                        placeholder='Enter OTP'
                    />
                    <button
                        type="submit"
                        className='bg-green-800 hover:bg-green-700 text-white py-2 rounded font-semibold'
                    >
                        Verify
                    </button>
                </form>
            </div>
        </section>
    )
}

export default VerifyEmailOtp
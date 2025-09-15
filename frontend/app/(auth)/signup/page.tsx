import { SignUpForm } from '@/app/components/SignUpForm'
import React from 'react'

const page = () => {
  return (
    <section className="max-w-[1240px] relative w-screen mx-auto border border-white flex justify-center items-center h-screen">
      <SignUpForm/>
    </section>
  )
}

export default page
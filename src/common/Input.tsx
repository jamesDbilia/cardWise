import React from 'react'

interface CustomInputProps {
  id: string
  register: any
  errors: any
}
export const CustomInput = ({ id, register, errors }: CustomInputProps) => {
  const formattedLabel = id
    .split(/(?=[A-Z])/)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div className='col-span-3 sm:col-span-2'>
      <label htmlFor={id} className='block text-sm font-bold text-gray-700'>
        {formattedLabel}
      </label>
      <div className='flex mt-1 rounded-md shadow-sm'>
        <input
          type='text'
          id={id}
          className='flex-1 block w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          placeholder=''
          {...register(id)}
        />
      </div>
      {errors[id]?.message && (
        <p className='text-error-light'>{errors[id]?.message.toString()}</p>
      )}
    </div>
  )
}

export default CustomInput

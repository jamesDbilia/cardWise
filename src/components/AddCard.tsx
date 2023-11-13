/* eslint-disable @next/next/no-img-element */
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { trpc } from '@/utils/trpc'

export default function AddCard() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const {
    mutate: submitAddCard,
    data,
    isLoading
  } = trpc.useMutation('card.add-card')

  const onSubmit = handleSubmit(async ({ psaUrl, searchUrl }: any) => {
    console.log('🚀 ~ file: AddCard.tsx:21 ~ psaUrl:', psaUrl)
    const card = {
      psaUrl,
      searchUrl
    }

    submitAddCard(card)
  })

  return (
    <>
      <div className=''>
        <div className='mt-5 md:mt-0'>
          <form id='details' action='#' method='POST' onSubmit={onSubmit}>
            <div className='font-formaDjrDeck font-bold text-5xl text-[#3D6386] text-center mb-6'>
              <h2>Create an event</h2>
            </div>
            <div className=''>
              <div className='space-y-6 bg-white '>
                <div className='space-y-2'>
                  <div className=''>
                    <label
                      htmlFor='hostName'
                      className='block text-sm font-bold text-gray-700'
                    >
                      PSA Url
                    </label>
                    <div className='flex mt-1 rounded-md shadow-sm'>
                      <input
                        type='text'
                        id='psaUrl'
                        className='flex-1 block w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        placeholder=''
                        {...register('psaUrl')}
                      />
                    </div>
                    {errors.psaUrl?.message && (
                      <p className='text-error-light'>
                        {errors.psaUrl?.message.toString()}
                      </p>
                    )}
                  </div>

                  {errors.title?.message && (
                    <p className='text-error-light'>
                      {errors.title?.message.toString()}
                    </p>
                  )}
                </div>

                <div className='col-span-3 sm:col-span-2'>
                  <label
                    htmlFor='searchUrl'
                    className='block text-sm font-bold text-gray-700'
                  >
                    Search Url
                  </label>
                  <div className='flex mt-1 rounded-md shadow-sm'>
                    <input
                      type='text'
                      id='searchUrl'
                      className='flex-1 block w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      placeholder=''
                      {...register('searchUrl')}
                    />
                  </div>
                  {errors.searchUrl?.message && (
                    <p className='text-error-light'>
                      {errors.searchUrl?.message.toString()}
                    </p>
                  )}
                </div>
                <div className='flex justify-center '>
                  <button
                    type='submit'
                    className='justify-center flex-1 mt-8 mb-8'
                  >
                    Add Card
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

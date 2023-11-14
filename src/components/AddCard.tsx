/* eslint-disable @next/next/no-img-element */
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { trpc } from '@/utils/trpc'
import CustomInput from '@/common/Input'
import { addCardInputFields } from '@/constants/AddCardInputFields'

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

  const onSubmit = handleSubmit(
    async ({
      name,
      brand,
      year,
      psaUrl,
      ebayUrl,
      notIncludesKeywords,
      includesKeywords
    }) => {
      const card = {
        name,
        brand,
        year,
        psaUrl,
        ebayUrl,
        notIncludesKeywords,
        includesKeywords
      }

      submitAddCard(card)
    }
  )

  return (
    <>
      <div className='w-1/2 p-10'>
        <div className='mt-5 md:mt-0'>
          <form id='details' action='#' method='POST' onSubmit={onSubmit}>
            <div className='font-formaDjrDeck font-bold text-5xl text-[#3D6386] text-center mb-6'>
              <h2>Add a card</h2>
            </div>
            <div className=''>
              <div className='space-y-6 bg-white '>
                <div className='space-y-2'>
                  <div className=''>
                    {addCardInputFields.map((field) => (
                      <CustomInput
                        id={field}
                        key={field}
                        errors={errors}
                        register={register}
                      />
                    ))}
                  </div>
                </div>
                <div className='flex justify-center '>
                  <button
                    type='submit'
                    className='justify-center flex-1 mt-8 mb-8 bg-secondary-base text-white w-14 rounded-2xl py-5'
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

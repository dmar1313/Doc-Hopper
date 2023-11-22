import { useState, React } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import DriversService from './driverServices.js'

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dlNumber: yup.string().required(),
  address: yup.string().required(),
  vehicle: yup.string().required(),
  role: yup.string().required()
})

function AddDriverForm () {
  const [submitting, setSubmitting] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await DriversService.addDriver(data)
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* form inputs */}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}

export default AddDriverForm

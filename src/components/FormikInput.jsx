import React from 'react'
import { useField } from 'formik'
import styled from 'styled-components'
import { Textarea, Input } from './TextInput'

const ErrorText = styled.div`
  color: red;
`

const FormikInput = ({ name, type, ...props }) => {
  const [field, meta] = useField(name)

  return (
    <>
      {type === 'textarea'
        ? <Textarea {...field} {...props} />
        : <Input {...field} type={type} {...props} />
      }
      {meta.error && meta.touched &&
        <ErrorText>{meta.error}</ErrorText>
      }
    </>
  )
}

export default FormikInput
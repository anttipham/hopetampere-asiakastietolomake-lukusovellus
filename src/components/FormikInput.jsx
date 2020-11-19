import React from 'react'
import { useField } from 'formik'
import styled from 'styled-components'
import { Textarea, Input } from './TextInput'

const ErrorText = styled.div`
  color: red;
`

const FormikInput = ({ name, type, rows, style }) => {
  const [field, meta] = useField(name)

  return (
    <>
      {type === 'textarea'
        ? <Textarea {...field} rows={rows} style={style} />
        : <Input {...field} type={type} style={style} />
      }
      {meta.error && meta.touched &&
        <ErrorText>{meta.error}</ErrorText>
      }
    </>
  )
}

export default FormikInput
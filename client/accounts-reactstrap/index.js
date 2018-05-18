import React    from 'react'
import Button   from './Button'
import Errors   from './Errors'
import Input    from './Input'
import { Form } from 'reactstrap'

const Title = ({ text }) => (
  <h1>{text}</h1>
)

export {
  Button as SubmitField,
  Errors as ErrorsField,
  Form   as FormField,
  Input  as InputField,
  Title  as TitleField
}

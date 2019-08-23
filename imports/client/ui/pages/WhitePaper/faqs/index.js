// Imports
import React, { Fragment } from 'react'
import Content from './Content'
import NavMenu from '../NavMenu'
import './styles.scss'


const Index = (props) => (
  <Fragment>
    <NavMenu />
    <Content dcsTags={props.dcsTags}/>
  </Fragment>
)

export default Index

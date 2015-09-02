/**
 * Created by acezou on 15/9/2.
 */
import { Route as R } from 'react-router'
import React, { PropTypes } from 'react'

export default class Route extends React.Component {
  static propTypes = {
    //children: PropTypes.object,
    //component: PropTypes.object.isRequired,
  }

  constructor() {
    super(arguments)
    console.log('=1=1=1==========')
  }

  render() {
    const { children, component, onEnter, ...restProps } = this.props
    let _onEnter = onEnter
    console.info(33333333)
    if (typeof component.onEnter === 'function') {
      console.info(2222222222222)
      _onEnter = onEnter ? () => {
        component.onEnter(arguments)
        onEnter(arguments)
      } : component.onEnter
    }
    return (
      <R component={component} onEnter={_onEnter} {...restProps}>
        {children}
      </R>
    )
  }
}

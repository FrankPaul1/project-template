/**
 * Created by acezou on 15/9/2.
 */
import { Route as R } from 'react-router'
import React, { PropTypes } from 'react'

export default class Route1 extends React.Component {

  constructor(props, context) {
    super(props, context)

    console.log('**********************************************************')
  }

  render() {
    const { children, component, onEnter, ...restProps } = this.props
    let _onEnter = onEnter
    console.log('**********************************************************')
    console.log(33333333)
    if (typeof component.onEnter === 'function') {
      console.info(2222222222222)
      _onEnter = onEnter ? () => {
        component.onEnter(arguments)
        onEnter(arguments)
      } : component.onEnter
    }
    // return React.addons.cloneWithProps(R, {...restProps, component, onEnter: _onEnter})
    return (
      <R component={component}>
        <h1>MMMM</h1>
        {children}
      </R>
    )
  }
}

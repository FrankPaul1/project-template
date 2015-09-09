/**
 * Created by acezou on 15/9/8.
 */
import React, { PropTypes } from 'react'
import Radium from 'radium'

/* 整页加载动画 */
const pageBounceFrames = Radium.keyframes({
  '0%': {
    transform: 'scale(0.0)',
  },
  '40%': {
    transform: 'scale(1.0)',
  },
  '80%': {
    transform: 'scale(0.0)',
  },
  '100%': {
    transform: 'scale(0.0)',
  },
})

/* 局部加载动画 */
const localBounceFrames = pageBounceFrames

const style = {
  hide: {
    display: 'none',
  },
  page: {
    wapper: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999,
      background: '#ddd',
    },
    spinnerPage: {
      position: 'absolute',
      width: '68px',
      height: '68px',
      top: '50%',
      left: '50%',
      margin: '-34px 0 0 -34px',
    },
    doubleBounce: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      backgroundColor: '#399FE9',
      opacity: '0.6',
      position: 'absolute',
      top: 0,
      left: 0,
      animation: `${pageBounceFrames} 2.0s infinite ease-in-out`,
    },
    doubleBounceDelay: {
      animationDelay: '-1.0s',
    },
  },
  local: {
    wapper: {
      margin: 'auto',
      padding: '1rem',
    },
    spinnerLocal: {
      position: 'relative',
      width: '90px',
      textAlign: 'center',
      margin: '1rem auto',
    },
    bounce: {
      width: '30px',
      height: '30px',
      backgroundColor: '#399FE9',
      borderRadius: '100%',
      display: 'inline-block',
      animation: `${localBounceFrames} 1.4s infinite ease-in-out`,
      animationFillMode: 'both',
    },
    bounceDelay1: {
      animationDelay: '-0.32s',
    },
    bounceDelay2: {
      animationDelay: '-0.16s',
    },
  },
}

@Radium
export default
class LoadComponent extends React.Component {
  static propTypes = {
    local: PropTypes.bool,
    style: PropTypes.object,
    isLoading: PropTypes.bool,
  }

  render() {
    // if local loading
    const { local, isLoading } = this.props
    const display = isLoading ? {} : style.hide
    if (local) {
      return (
        <div className="wapper" style={[display, style.local.wapper, this.props.style || {}]}>
          <div className="spinner-local" style={style.local.spinnerLocal}>
            <div className="bounce1" style={[style.local.bounce, style.local.bounceDelay1]}/>
            <div className="bounce2" style={[style.local.bounce, style.local.bounceDelay2]}/>
            <div className="bounce3" style={[style.local.bounce]}/>
          </div>
        </div>
      )
    }
    // page loading
    return (
      <div className="wapper" style={[display, style.page.wapper, this.props.style || {}]}>
        <div className="spinner-page" style={style.page.spinnerPage}>
          <div className="double-bounce1" style={style.page.doubleBounce}/>
          <div className="double-bounce2" style={[style.page.doubleBounce, style.page.doubleBounceDelay]}/>
        </div>
      </div>
    )
  }
}

/**
 * Created by acezou on 15/8/24.
 */
import React, { PropTypes } from 'react'
import Radium from 'radium'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'

const style = {
  hide: {
    display: 'none',
  },
  container: {
    position: 'fixed',
    width: '300px',
    top: 0,
    right: 0,
  },
  closeButton: {
    color: 'white',
    background: 'rgb(79, 90 ,101)',
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: '3px',
    padding: '5px 9px',
    margin: '5px 8px',
    fontSize: '0.8em',
    zIndex: 10001,
    position: 'fixed',
  },
}

@Radium
export default
class HideableDebugPanel extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  constructor(props, contexts) {
    super(props, contexts)
    this.state = {hidden: false}
  }

  render() {
    return (
      <div style={[this.state.hidden ? style.hide : {}, style.container]}>
        <div onClick={::this.handlerClick} style={style.closeButton}>CLOSE</div>

        <DebugPanel top right bottom>
          <DevTools store={this.props.store}
                    monitor={LogMonitor}/>
        </DebugPanel>
      </div>
    )
  }

  handlerClick() {
    this.setState({
      hidden: true,
    })
  }
}


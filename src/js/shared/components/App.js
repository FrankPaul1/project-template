import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Helmet from './common/HelmetComponent'
import prepareRoute from '../lib/prepareRoute'
import { info as InfoActionCreators } from '../actions'
import Immutable from 'immutable'
import { isLoading } from '../reducers/Load'
import { LoadComponent } from './index'
import ActionTypes from '../constants/ActionTypes'

@prepareRoute(async ({dispatch}) => {
  //logger.info('prepareRoute runing')
  return await * [
    dispatch(InfoActionCreators.getInfo()),
  ]
})
@connect(state => {
  return {Info: state.Info, Load: state.Load}
}, dispatch => {
  logger.info('bindActionCreators runing')
  return bindActionCreators(InfoActionCreators, dispatch)
})
class App extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    Info: PropTypes.instanceOf(Immutable.Map).isRequired,
    Load: PropTypes.instanceOf(Immutable.Map).isRequired,
    location: PropTypes.object.isRequired,
  }

  render() {
    // you can log information anywhere, which will also log on server console
    // logger is global variable, support log & info & debug & error
    logger.info('this is log from client, but can also log on server console')

    return (
      <div id="app">
        <Helmet title="Info" />

        <LoadComponent isLoading={(isLoading(this.props.Load, null, this.props.location) || !__CLIENT__)}/>
        <h1>APP1</h1>
        <h2>{this.props.Info.get('serverInfo')}</h2>
        <button onClick={::this.updateInfo}>Update Info</button>
        <LoadComponent local={true} isLoading={isLoading(this.props.Load, ActionTypes.Info.Request)} />
        {this.props.children}
      </div>
    )
  }

  updateInfo() {
    this.props.getInfo()
  }
}

export default App

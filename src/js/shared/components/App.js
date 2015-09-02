import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Helmet from './common/HelmetComponent'
import prepareRoute from '../lib/prepareRoute'
import { info as InfoActionCreators } from '../actions'

@prepareRoute(async ({store}) => {
  //logger.info('prepareRoute runing')
  //return await * [
  //  store.dispatch(InfoActionCreators.getInfo()),
  //]
})
@connect(state => {
  return {Info: state.Info}
}, dispatch => {
  logger.info('bindActionCreators runing')
  return bindActionCreators(InfoActionCreators, dispatch)
})
class App extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    Info: PropTypes.object.isRequired,
  }

  //async componentWillMount() {
  //  logger.info('----------------')
  //  await this.props.getInfo()
  //}

  render() {
    // you can log information anywhere, which will also log on server console
    // logger is global variable, support log & info & debug & error
    logger.info('this is log from client, but can also log on server console')

    return (
      <div id="app">
        <Helmet title="Info" />
        <h1>APP1</h1>
        <h2>{this.props.Info.get('serverInfo')}</h2>
        {this.props.children}
      </div>
    )
  }
}

App.onEnter = function() {
  console.info('----------------')
  // await this.props.getInfo()
}


export default App

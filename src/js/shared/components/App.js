import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Helmet from './common/HelmetComponent'
import prepareRoute from '../lib/prepareRoute'
import { info as InfoActionCreators } from '../actions'

@prepareRoute(async ({store}) => {
  return await * [
    store.dispatch(InfoActionCreators.getInfo()),
  ]
})
@connect(state => {
  return {Info: state.Info}
}, dispatch => {
  console.info('----------')
  console.info(bindActionCreators(InfoActionCreators, dispatch))
  return bindActionCreators(InfoActionCreators, dispatch)
})
export default
class App extends React.Component {
  static propTypes = {
    children: PropTypes.object,
    Info: PropTypes.object.isRequired,
  }

  render() {
    // you can log information anywhere, which will also log on server console
    // logger is global variable, support log & info & debug & error
    logger.info('this is log from client, but can also log on server console')
    if(this.props.Info) logger.info(this.props.Info.toJS())
    console.info(this.props)
    return (
      <div id="app">
        <Helmet title="Info" />
        <h1>APP</h1>
        {this.props.children}
      </div>
    )
  }
}

import React, { PropTypes } from 'react'

export default
class App extends React.Component {
  static propTypes = {
    children: PropTypes.object,
  }

  render() {
    // you can log information anywhere, which will also log on server console
    // logger is global variable, support log & info & debug & error
    logger.info('this is log from client, but can also log on server console')
    return (
      <div id="app">
        <h1>APP</h1>
        {this.props.children}
      </div>
    )
  }
}

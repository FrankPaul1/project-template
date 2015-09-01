/**
 * Created by acezou on 15/8/12.
 */
import Helmet from 'react-helmet'
import React, { PropTypes } from 'react'

export default class HelmetComponent extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }
  render() {
    return (
      <Helmet
        title={this.props.title}
        titleTemplate="杏树林-%s"
      />
    )
  }
}

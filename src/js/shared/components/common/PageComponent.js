/**
 * Created by acezou on 15/7/14.
 */
import React, { PropTypes } from 'react'
import Radium from 'radium'

const style = {
  pageContainer: {
    borderTop: '1px solid #ccc',
    padding: '1rem 3rem 1rem 3rem',
    backgroundColor: '#eee',
  },
  locatePageInfo: {
    width: '100%',
    textAlign: 'right',
    right: '-4rem',
    position: 'relative',
  },
  pageIndex: {
    width: '4rem',
    height: '1.5rem',
    margin: '-0.25rem 1rem auto',
    textAlign: 'center',
  },
}

@Radium
export default
class PageComponent extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    style: PropTypes.object,
    pageInfo: PropTypes.object,
    location: PropTypes.object.isRequired,
    onPageChange: PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      index: 1,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.pageInfo && nextProps.pageInfo.index) {
      const nextIndex = nextProps.pageInfo.get('index')
      const index = (this.props.pageInfo) ? this.props.pageInfo.get('index') : 1
      if (nextIndex !== index) {
        this.setState({
          index: nextIndex,
        })
      }
    }
  }

  renderFirstPage() {
    let result = ''
    if (this.state.index <= 1) {
      result = (<span>首页 &nbsp;&nbsp;&nbsp; &lt; </span>)
    } else {
      result = (
        <span>
          <a onClick={() => {this.jumpToPage(1)}}>首页</a> &nbsp;&nbsp;&nbsp;
          <a onClick={() => {this.jumpToPage(+this.state.index - 1)}}>&lt;</a>
        </span>
      )
    }
    return result
  }

  renderLastPage(totalPageNum) {
    let result = ''
    if (totalPageNum <= this.state.index) {
      result = (<span>&gt; &nbsp;&nbsp;&nbsp; 尾页</span>)
    } else {
      result = (
        <span>
          <a onClick={() => {this.jumpToPage(+this.state.index + 1)}}>&gt;</a> &nbsp;&nbsp;&nbsp;
          <a onClick={() => {this.jumpToPage(totalPageNum)}}>尾页</a>
        </span>
      )
    }
    return result
  }

  render() {
    // pageInfos example {"index":2,"totalPageCount":22437,"totalPageNum":225}
    let { pageInfo } = this.props
    pageInfo = pageInfo ? pageInfo.toJS() : {}
    const totalPageCount = pageInfo.totalPageCount ? pageInfo.totalPageCount : 0
    const totalPageNum = pageInfo.totalPageNum ? pageInfo.totalPageNum : 0

    return (
      <div className="PageComponent grid-content vertical medium-12" style={this.props.style || {}}>
        {this.props.children}
        <div className="grid-block" style={style.pageContainer}>
          <div className="grid-block medium-8 small-12">
            {this.renderFirstPage()}
            <input style={style.pageIndex} type="text" className="pageIndex" value={this.state.index}
                   onChange={::this.handleChange} onKeyUp={::this.handlerKeyUp}/>
            {this.renderLastPage(totalPageNum)}
          </div>
          <div className="grid-block medium-4 small-12">
            <span style={style.locatePageInfo}>共 {totalPageCount} 条 &nbsp;&nbsp; 共 {totalPageNum} 页</span>
          </div>
        </div>
      </div>
    )
  }

  handleChange(e) {
    const theEvent = e || window.event
    this.setState({index: theEvent.target.value})
  }

  handlerKeyUp(e) {
    const theEvent = e || window.event
    const code = theEvent.keyCode || theEvent.which || theEvent.charCode
    if (code === 13) {
      this.jumpToPage(e.target.value)
    } else {
      // only number can be key in
      e.target.value = e.target.value.replace(/[^\d]*/ig, '')
    }
  }

  jumpToPage(index) {
    if (index >= 1 && index <= this.props.pageInfo.get('totalPageNum')) {
      this.setState({
        index,
      })
      const { onPageChange, location } = this.props
      const query = (location && location.query) ? location.query : {}
      const rootPath = (location && location.pathname) ? location.pathname.replace(/\/\d+$/, '') : ''
      this.context.router.transitionTo(`${rootPath}/${index}`, query)
      if (onPageChange) onPageChange(index)
    }
  }

}


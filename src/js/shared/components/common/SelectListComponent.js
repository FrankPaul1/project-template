import React, {PropTypes} from 'react'
import Radium from 'radium'
import utils from '../../utils'

const style = {
  handle: {
    margin: '1.5rem auto',
  },
  listGroup: {
    padding: '1rem 0 0 0rem',
  },
  buttonGroup: {
    lineHeight: '2.5rem',
    padding: '1rem',
    borderTop: '1px solid #ccc',
  },
  hide: {
    display: 'none',
  },
  listTitle: {
    marginLeft: '1rem',
  },
  moveButtonGroup: {
    padding: '0 2rem',
  },
  moveButton: {
    marginTop: '2rem',
    padding: '1rem',
  },
  selectItem: {
    textAlign: 'center',
  },
}

@Radium
export default
class SelectListComponent extends React.Component {
  static propTypes = {
    mappingList: PropTypes.object,
    selectIdList: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    style: PropTypes.object,
    headTitle: PropTypes.string.isRequired,
    handleCancel: PropTypes.func,
    handleSave: PropTypes.func,
    handleRemove: PropTypes.func,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      selectId: [],
      checkedId: [],
      mapping: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!utils.equal(this.props.selectIdList, nextProps.selectIdList)) {
      this.setState({selectId: nextProps.selectIdList ? nextProps.selectIdList.sort() : []})
    }
    if (!utils.equal(this.props.mappingList, nextProps.mappingList)) {
      const mapping = {}
      nextProps.mappingList.forEach(item => {
        mapping[item.id] = item.value
      })
      this.setState({mapping})
    }
  }

  render() {
    const { selectId, checkedId, mapping } = this.state
    const restIdList = mapping ? Object.keys(mapping).filter(id => !Array.includes(selectId, +id)).map(id => +id) : []

    const RestTable = restIdList.map(id => {
      return (
        <tr key={id} onClick={() => {this.toggleSelectItem(id)}}>
          <td style={style.selectItem}>
            <input type="checkbox" value={id} checked={Array.includes(checkedId, id)}
                     onChange={(e) => (this.handleChange(e, 'checkedId'))}/></td>
          <td>{id}</td>
          <td>{mapping[id]}</td>
        </tr>
      )
    })

    const SelectTable = selectId.map(id => {
      return (
        <tr key={id} onClick={() => {this.toggleSelectItem(id)}}>
          <td style={style.selectItem}>
            <input type="checkbox" value={id} checked={Array.includes(checkedId, id)}
                   onChange={(e) => (this.handleChange(e, 'checkedId'))}/>
          </td>
          <td>{id}</td>
          <td>{mapping[id]}</td>
        </tr>
      )
    })

    const tHeader = (
      <thead>
      <tr>
        <th>选择</th>
        <th>序号</th>
        <th>{this.props.headTitle}</th>
      </tr>
      </thead>
    )

    return (
      <div className="SelectListComponent grid-content vertical medium-12"
           style={[this.props.style || {}]}>
        <div className="grid-block" style={style.listGroup}>
          <div className="small-5 medium-5 grid-content vertical">
            <span style={style.listTitle}>未选择</span>
            <table className="table">
              {tHeader}
              <tbody>
              {RestTable}
              </tbody>
            </table>
          </div>
          <div className="small-2 medium-1 grid-content vertical" style={style.moveButtonGroup}>
                <span className="alert button expand"
                      style={style.moveButton}
                      onClick={::this.addItem}>&gt;</span>
                <span className="success button expand"
                      style={style.moveButton}
                      onClick={::this.removeItem}>&lt;</span>
          </div>
          <div className="small-5 medium-5 grid-block vertical" style={style.prtable}>
            <span style={style.listTitle}>已选择</span>
            <table className="table">
              {tHeader}
              <tbody>
              {SelectTable}
              </tbody>
            </table>
          </div>
        </div>
        <div className="grid-block" style={style.buttonGroup}>
          <div className="grid-content medium-1" style={this.props.handleCancel ? {} : style.hide}><a onClick={::this.cancel}>取消</a></div>
          <div className="grid-block medium-1" style={this.props.handleSave ? {} : style.hide}>
            <a onClick={::this.save} className="button expand success">保存</a>
          </div>
          <div className="medium-offset-2 medium-1 small-1" style={this.props.handleRemove ? {} : style.hide}>
            <a onClick={::this.remove} className="alert hollow button expand">删除</a>
          </div>
        </div>
      </div>
    )
  }

  toggleSelectItem(_id) {
    const id = _id
    let { checkedId=[] } = this.state
    if (Array.includes(checkedId, id)) {
      checkedId = checkedId.filter(i => i !== id)
    } else {
      checkedId.push(id)
    }
    this.setState({checkedId})
  }

  addItem() {
    if (this.state.checkedId.length > 0) {
      let selectId = this.state.selectId || []
      const addedId = this.state.checkedId.filter(id => !Array.includes(this.state.selectId, id)).sort()
      selectId = selectId.concat(addedId).sort()
      this.setState({
        checkedId: [],
        selectId,
      })
    }
  }

  removeItem() {
    if (this.state.checkedId.length > 0) {
      const selectId = this.state.selectId.filter(id => !Array.includes(this.state.checkedId, id)).sort()
      this.setState({
        checkedId: [],
        selectId,
      })
    }
  }

  handleChange(e, item) {
    const theEvent = e || window.event
    let value = theEvent.target.value
    // if checkbox, toggle value
    if (e.target.type === 'checkbox') {
      let arrayObj = this.state[item]
      value = +value
      if (e.target.checked && !Array.includes(arrayObj, value)) {
        arrayObj.push(value)
      }
      if (!e.target.checked && Array.includes(arrayObj, value)) {
        arrayObj = arrayObj.filter(i => i !== value)
      }
      value = arrayObj
    }
    this.setState({[item]: value})
  }

  save() {
    this.props.handleSave(this.state.selectId)
  }

  remove() {
    this.props.handleRemove()
  }

  cancel() {
    if (!utils.checkDiff(this.state.selectId, this.props.selectIdList)
      || (window.confirm && !confirm('是否保存已编辑的内容？'))) {
      this.props.handleCancel()
    }
  }
}


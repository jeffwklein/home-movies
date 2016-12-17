import React, { Component } from 'react'
import { connect } from 'react-redux'


export class App extends Component {
  constructor() {
    super()
    this.state = {
      displayValue: '0',
      operatorApplied: null,
      leftOperand: null
    }
  }

  numberClicked = (number) => {
    const {
      displayValue,
      operatorApplied,
      leftOperand
    } = this.state
    if (operatorApplied) {
      operatorApplied(leftOperand, Math.parseFloat(displayValue))
      //TODO
    } else {
      if (displayValue === '0') {
        this.setState({
          displayValue: number.toString()
        })
      } else if (displayValue.length < 7) {
        this.setState({
          displayValue: displayValue + number.toString()
        })
      } else {
        // limit reached
      }
    }
  }

  render() {
    const {
      displayValue,
    } = this.state
    return (
      <div id="calculator" className="calculator">
        <div className="calculator__results">
          { displayValue }
        </div>
        <div className="calculator__keypad">
          <div className="calculator__keypad__row">
            <button>AC</button>
            <button>+/−</button>
            <button>%</button>
            <button>÷</button>
          </div>
          <div className="calculator__keypad__row">
            <button onClick={() => this.numberClicked(7)}>7</button>
            <button onClick={() => this.numberClicked(8)}>8</button>
            <button onClick={() => this.numberClicked(9)}>9</button>
            <button>×</button>
          </div>
          <div className="calculator__keypad__row">
            <button onClick={() => this.numberClicked(4)}>4</button>
            <button onClick={() => this.numberClicked(5)}>5</button>
            <button onClick={() => this.numberClicked(6)}>6</button>
            <button>−</button>
          </div>
          <div className="calculator__keypad__row">
            <button onClick={() => this.numberClicked(1)}>1</button>
            <button onClick={() => this.numberClicked(2)}>2</button>
            <button onClick={() => this.numberClicked(3)}>3</button>
            <button>+</button>
          </div>
          <div className="calculator__keypad__row">
            <button className="zero">0</button>
            <button>.</button>
            <button>=</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    doc: state.doc
  }),
  (dispatch) => bindActionCreators(DocActions, dispatch)
)(App)


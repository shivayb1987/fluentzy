import React, { PropTypes } from 'react'
import styled from 'styled-components'

const UnitsComponent = styled.div`
  text-align: center;
  font-size: 20px;
  /* transition-timing-function: ease;
  transition-duration: 1s;
  animation: customAnimation 1s infinite; */
  font-weight: bold;
  color: ${props => props.color}
`
export default class Units extends React.Component {
  constructor () {
    super()
    this.state = {
      sentence: '',
      index: 0,
      color: 'red',
      filter: '',
      speed: 1000
    }
    this.colors = {
      0: "red",
      1: "green",
      2: "purple",
      3: "black",
      4: "orangered",
      5: "blue",
      6: "brown",
      8: "palegreen",
      10: "salmon"
    }
  }

  updateSentence = () => {
    const { value } = this.props
    if (!value.key.length) {
      return
    }
    let index = this.state.index
    let next = (index + 1) % value.key.length
    if (this.props.shuffled) {
      next = Math.floor(Math.random() * value.key.length)
    }
    const color = next % (Object.keys(this.colors).length)
    const sentence = value["key"][index] || ''
    this.setState({
      sentence,
      previous: this.state.sentence,
      index: next,
      color: this.colors[color]
    })
  }

  componentWillReceiveProps (nextProps) {
    this.id && clearInterval(this.id)
    if (!nextProps.paused) {
        this.id = setInterval(this.updateSentence, nextProps.speed)
        if (nextProps.section !== this.props.section) {
          this.setState({
            index: 0
          })
        }
    }
  }

  render () {
    const { sentence, color } = this.state
    return (
      <UnitsComponent color={color}>
        <span>{sentence.split('+').map((question, key) => <div key={key}>{question}</div>)}</span>
        {/* <div>{this.state.previous}</div> */}
      </UnitsComponent>
    )
  }
}

Units.propTypes = {
}

Units.defaultProps = {
    speed: 1000
}

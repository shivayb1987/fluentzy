import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Line } from 'react-progressbar.js'
const UnitsComponent = styled.div`
  text-align: center;
  font-size: 20px;
  /* transition-timing-function: ease;
  transition-duration: 1s;
  animation: customAnimation 1s infinite; */
  font-weight: bold;
  color: ${props => props.color}
`
const Playing = styled.div`
  font-size: 10px;
  color: gray;
  margin-top: 10px;
`
export default class Units extends React.Component {
  constructor () {
    super()
    this.state = {
      sentence: '',
      index: 0,
      color: 'red',
      filter: '',
      speed: 1000,
      count: 0,
      progress: 0
    }
    this.colors = {
      0: "red",
      1: "green",
      2: "purple",
      3: "#607d8b",
      4: "orangered",
      5: "blue",
      6: "brown",
      7: "#009688"
    }
  }

  updateSentence = () => {
    const { value } = this.props
    const length = value.key.length
    if (!length) {
      return
    }
    let index = this.state.index
    let next = (index + 1) % length
    if (this.props.shuffled) {
      next = Math.floor(Math.random() * length)
    }
    const color = next % (Object.keys(this.colors).length)
    const sentence = value["key"][index] || ''
    const progress = (this.state.count / length)
    this.setState({
      sentence,
      previous: this.state.sentence,
      index: next,
      color: this.colors[color],
      count: this.state.count + 1,
      progress
    })
  }

  componentWillReceiveProps (nextProps) {
    this.id && clearInterval(this.id)
    if (!nextProps.paused) {
        this.id = setInterval(this.updateSentence.bind(this), nextProps.speed)
    }
    if (nextProps.section !== this.props.section) {
      this.setState({
        index: 0,
        progress: 0,
        count: 0
      })
    }
  }

  componentWillUnmount () {
    clearInterval(this.id)
  }

  render () {
    const { sentence, color, progress } = this.state
    var options = {
        strokeWidth: 1,
        trailColor: '#f4f4f4',
        trailWidth: 1,
        color: 'green',
        text: {
          style: {
            fontSize: '10px'
          }
        }
    };
    const percent = Math.floor(progress  * 100) + '%'
    return (
      <UnitsComponent color={color}>
        <Line progress={this.state.progress} options={options} text={percent} initialAnimate />
        {<Playing>(playing: {this.props.section})</Playing>}
        <span>{sentence.split('+').map((question, key) => <div key={key}>{question}</div>)}</span>
      </UnitsComponent>
    )
  }
}

Units.propTypes = {
}

Units.defaultProps = {
    speed: 1000
}

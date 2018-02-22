import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Line } from 'react-progressbar.js'

const FunctionalComponent = styled.div`
  text-align: center;
  font-size: 20px;
  /* transition-timing-function: ease;
  transition-duration: 1s;
  animation: customAnimation 1s infinite; */
  font-weight: bold;
`
const Sentence = styled.div`
  color: ${props => props.color}
`
const Playing = styled.div`
  font-size: 10px;
  color: gray;
  margin-top: 10px;
`
export default class Functional extends React.Component {
  constructor () {
    super()
    this.state = {
      sentence: '',
      index: 0,
      topicIndex: 0,
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
    const { value, countKeys } = this.props
    let { topicIndex } = this.state
    const length = Object.keys(value).length
    if (!length) {
      return
    }
    let index = this.state.index
    const key = Object.keys(value)[topicIndex]
    const sentence = value[key][index] || ''
    let next = index + 1
    let count = this.state.count + 1
    if (next >= value[key].length) {
      topicIndex = (topicIndex + 1) % Object.keys(value).length,
      next = 0
      if (countKeys) {
        if (next > length ) {
          count = 0
        }
      } else {
        count = 0
      }
    }
    const progress = (count / (countKeys ? length : value[key].length))
    const color = next % (Object.keys(this.colors).length)
    this.setState({
      sentence,
      previous: this.state.sentence,
      index: next,
      topicIndex,
      topic: key,
      color: this.colors[color],
      count: count,
      progress
    })
  }

  componentWillReceiveProps (nextProps) {
    this.id && clearInterval(this.id)
    if (!nextProps.paused) {
        this.id = setInterval(this.updateSentence, nextProps.speed)
        if (nextProps.section !== this.props.section) {
          this.setState({
            index: 0,
            topicIndex: 0,
            progress: 0,
            count: 0
          })
        }
    }
    if (nextProps.shuffled) {
      let topicIndex = Math.floor(Math.random() * Object.keys(this.props.value).length)
      this.setState({
        topicIndex
      })
    }
  }

  componentWillUnmount () {
    clearInterval(this.id)
  }

  render () {
    const { sentence, color, topic, progress } = this.state
    var options = {
        strokeWidth: 1,
        trailColor: '#f4f4f4',
        trailWidth: 1,
        strokeColor: 'red',
        text: {
          style: {
            fontSize: '10px'
          }
        }
    };
    const percent = Math.floor(progress  * 101) + '%'
    return (
        <FunctionalComponent>
        <Line progress={progress} options={options} text={percent} initialAnimate />
        {<Playing>(playing: {this.props.section})</Playing>}
          <div>{topic}</div>
          <Sentence color={color}>{sentence.split('+').map((question, key) => <div key={key}>{question}</div>)}</Sentence>
        </FunctionalComponent>
    )
  }
}

Functional.propTypes = {
}

Functional.defaultProps = {
    speed: 1000
}

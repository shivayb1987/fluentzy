import React, { PropTypes } from 'react'
import styled from 'styled-components'

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
export default class Functional extends React.Component {
  constructor () {
    super()
    this.state = {
      sentence: '',
      index: 0,
      topicIndex: 0,
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
    let { topicIndex } = this.state
    const length = Object.keys(value).length
    if (!length) {
      return
    }
    let index = this.state.index
    const key = Object.keys(value)[topicIndex]
    const sentence = value[key][index] || ''
    let next = index + 1
    if (next >= value[key].length) {
      topicIndex = (topicIndex + 1) % Object.keys(value).length,
      next = 0
    }
    const color = next % (Object.keys(this.colors).length)
    this.setState({
      sentence,
      previous: this.state.sentence,
      index: next,
      topicIndex,
      topic: key,
      color: this.colors[color]
    })
  }

  componentWillReceiveProps (nextProps) {
    this.id && clearInterval(this.id)
    if (!nextProps.paused) {
        this.id = setInterval(this.updateSentence, nextProps.speed)
        if (nextProps.section !== this.props.section) {
          this.setState({
            index: 0,
            topicIndex: 0
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

  render () {
    const { sentence, color, topic } = this.state
    return (
        <FunctionalComponent>
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

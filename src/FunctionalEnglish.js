import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Line } from 'react-progressbar.js'
const Button = styled.button`
  margin-left: 20px;
`

const FunctionalComponent = styled.div`
  text-align: center;
  font-size: 20px;
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
const Category = styled.div`
  font-size: 10px;
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
    let { index, reversed, count } = this.state
    let next = reversed ? index - 1 : index + 1
    if (next < 0) {
      next = 0
      this.setState({
        reversed: false
      })
    }
    const key = Object.keys(value)[topicIndex]
    const sentence = value[key][index] || ''
    /* let count = this.state.count */
    if (!countKeys) {
      count = count = reversed ? count -1 : count + 1
    }
    let subLength = countKeys ? length : value[key].length
    if (next >= value[key].length) {
      topicIndex = (topicIndex + 1) % Object.keys(value).length,
      next = 0
      if (countKeys) {
        count = count = reversed ? count -1 : count + 1
        if (next > length ) {
          count = 0
        }
      } else {
        count = 0
      }
    }
    count = count % subLength
    const progress = (count / subLength)
    const color = next % (Object.keys(this.colors).length)
    const color2 = (next+1) % (Object.keys(this.colors).length)
    this.setState({
      sentence,
      previous: this.state.sentence,
      index: next,
      topicIndex,
      topic: key,
      color: this.colors[color],
      color2: this.colors[color2],
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

  onPrevious = () => {
    this.setState({
      reversed: !this.state.reversed
    })
  }

  render () {
    const { sentence, color, color2, topic, progress, reversed } = this.state
    const colors = [color, color2]
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
        {<Playing>(playing: {this.props.section})<Button onClick={this.onPrevious}>{reversed ? 'Next' : 'Previous'}</Button></Playing>}
          <Category>{topic}</Category>
          {sentence.split('+').map((question, key) => <Sentence color={colors[key]} key={key}>{question}</Sentence>)}
        </FunctionalComponent>
    )
  }
}

Functional.propTypes = {
}

Functional.defaultProps = {
    speed: 1000
}

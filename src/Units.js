import React, { PropTypes } from 'react'
// import GSs from './GSs'
import GSs from './QuestionTags'
import { setInterval, setTimeout, clearInterval } from 'timers';
import './App.css'
import './animate.css'
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
      7: "violet",
      8: "palegreen",
      9: "pink",
      10: "salmon"
    }
  }

  updateSentence = () => {
    let index = this.state.index
    let next = (index + 1) % GSs.key.length
    if (this.props.shuffled) {
      next = Math.floor(Math.random() * GSs.key.length)
    }
    const color = next % (Object.keys(this.colors).length)
    const sentence = GSs["key"][index]
    this.setState({
      sentence,
      previous: this.state.sentence,
      index: next,
      color: this.colors[color]
    })
  }

  componentWillReceiveProps (nextProps) {
    clearInterval(this.id)
    if (!nextProps.paused) {
        this.id = setInterval(this.updateSentence, nextProps.speed)
    }
  }

  render () {
    // const classNames = ["Units", "animated", "bounce", "infinite"]
    const classNames = ["Units"]
    return (
      <div className={classNames.join(" ")}>
        {/* <input ref={field => this.field = field}/> */}
        <span className={this.state.color}>{this.state.sentence.split('+').map(question => <div>{question}</div>)}</span>
        {/* <div>{this.state.previous}</div> */}
      </div>
    )
  }
}

Units.propTypes = {
}

Units.defaultProps = {
    speed: 1000
}

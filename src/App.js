import React, { PropTypes } from 'react'
// import GSs from './GSs'
import { setInterval, setTimeout, clearInterval } from 'timers';
import './App.css'
import './animate.css'
import Units from './Units'
export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      speed: 1000,
      paused: false
    }
  }

  componentDidMount () {
    this.increase()
    let { onClear, onReset } = this.props;
    
    document.addEventListener('keydown', (event) => {
      let { keyCode } = event;
      if (keyCode === 32) {
        this.pause()
      }
      if (keyCode === 40) {
        this.increase()
      }
      if (keyCode === 38) {
        this.decrease()
      }
    })
  
  }

  increase = () => {
    this.setState({
      speed: this.state.speed + 200
    })
  }
  
  decrease = () => {
    this.setState({
      speed: this.state.speed > 0 ? this.state.speed - 200 : 1000
    })
  }

  pause = () => {
    setTimeout(this.setState({
      paused: !this.state.paused
    }), 0)
  }

  shuffle = () => {
    this.setState({
      shuffled: !this.state.shuffled
    })
  }

  render () {
    const { speed, paused, shuffled } = this.state
    return (
      <div className='App'>
        {/* <input ref={field => this.field = field}/> */}
        <div >
          <div className='plus' onClick={this.shuffle}>&#128256;</div>
          <span className='speed'>Speed: {this.state.speed/1000}s </span>
          <div className='plus' onClick={this.decrease}>+</div><div className='minus' onClick={this.increase}>-</div>
        </div>
        <Units speed={speed} paused={paused} shuffled={shuffled}/>
      </div>
    )
  }
}

App.propTypes = {
}

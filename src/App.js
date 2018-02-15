import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Units from './Units'
import sections from './Config'
import Dummy from './Dummy'
const AppComponent = styled.div`
  display: flex;
  margin-bottom: 20px;
`
const Section = styled.div`
  margin: 10px;
  border: 1px solid dotted;
  height: 150px;
  overflow: auto;
`
const Header = styled.div`
  padding: 5px;
  font-weight: bold;
  color: red;
  cursor: pointer;
  border: 1px dotted;
  background-color: ${props => props.selected? 'lightblue': 'lightyellow'};
`
const AppArea = styled.div`
  text-align: center;
  margin: 20px 0px 0 0px;
  font-size: 20px;
  font-weight: bold;
  flex: 2;
`
const Control = styled.div`
  cursor: pointer;
  padding: 5px 0;
  font-size: 30px;
`
const Span = styled.span`
  color: orange;
  font-weight: bold;
  font-size: 12px;
`
class App extends React.Component {
  constructor () {
    super()
    this.state = {
      speed: 1000,
      paused: false,
      component: Dummy,
      section: {}
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
    const { name, component } = sections[0]
    this.props.onClick(name.replace(/ /g, ''))
    this.setState({
      section: name,
      component
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
      this.setState({
          paused: !this.state.paused
      })
  }

  shuffle = () => {
    this.setState({
      shuffled: !this.state.shuffled
    })
  }

  onSectionClick = ({name, component}) => {
    this.props.onClick(name.replace(/ /g, ''))
    this.setState({
      section: name,
      component
    })
  }

  render () {
    const { speed, paused, shuffled, section, component } = this.state
    const { onClick } = this.props
    return <span>
      <Span>Excerpts from Prof. Kev Nair's Fluentzy: Fluency Development  (<a href='http://fluentzy.com/' target='_blank'>fluentzy.com</a>)</Span>
      <AppComponent>
        <Section>
          <div>Click a topic to begin!</div>
          {sections.map((sec, index) => <Header key={index} selected={sec.name === section} onClick={() => this.onSectionClick(sec)}>{sec.name}</Header>)}
        </Section>
        <AppArea>
            <div className='plus' onClick={this.shuffle}>&#128256;</div>
            <span className='speed'>Speed: {this.state.speed/1000}s </span>
            <Control className='plus' onClick={this.decrease}>+</Control>
            <Control className='minus' onClick={this.increase}>-</Control>
        </AppArea>
      </AppComponent>
      {React.createElement(component, {
        value: this.props.value,
        section,
        speed,
        paused,
        shuffled
      })}
      </span>
  }
}

App.propTypes = {
}
const s = state => ({
  value: state
})
const d = dispatch => ({
  onClick: (payload) => dispatch({type: 'HANDLE_REQUEST', payload})
})
export default connect(s, d)(App)
import React, { Component } from 'react'

export const onClickOutside = callback => WrappedComponent => class extends Component {
  static displayName = `handleClickOutside(${Component.displayName || Component.name || 'Component'})`
  
  componentDidMount() {
    document.addEventListener('click', this.clickOutsideHandler)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickOutsideHandler)
  }

  clickOutsideTargetRef = null
  setClickOutsideTargetRef = ref => { this.clickOutsideTargetRef = ref }

  clickOutsideHandler = e => {
    if (this.clickOutsideTargetRef.contains(e.target)) return
    
    callback(this.props)
  }

  render() {
    return (
      <WrappedComponent {...this.props}
                        setClickOutsideTargetRef={this.setClickOutsideTargetRef} />
    )
  }
}

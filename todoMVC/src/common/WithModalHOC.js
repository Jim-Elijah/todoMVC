import React from 'react'
import { Modal } from 'antd'

// function WithModalHOC(WrappedComponent) {
//   class WithModal extends Component {
//     constructor(props) {
//       super(props)
//       this.state = {
//         isOpen: true,
//       }
//     }
//     setIsOpen = (val) => {
//       console.log('setIsOpen', val)
//       this.setState({ isOpen: val })
//     }
//     render() {
//       const { isOpen } = this.state
//       const { title = '222' } = this.props
//       return <Modal title={title} open={isOpen}>
//         <WrappedComponent {...this.props}  {...this.state} setIsOpen={this.setIsOpen} />
//       </Modal>
//     }
//   }
//   WithModal.displayName = `WithModal${getDisplayName(WrappedComponent)}`

//   return WithModal
// }

function WithModalHOC(WrappedComponent) {
  class WithModal extends WrappedComponent {
    constructor(props) {
      super(props)
      const tmp = this.state
      this.state = {
        ...tmp,
        isOpen: true,
      }
    }
    setIsOpen = (val) => {
      console.log('setIsOpen', val)
      this.setState({ isOpen: val })
    }
    render() {
      // const elementsTree = super.render();
      const { isOpen, modalConfig, } = this.state
      console.log('WithModal render', this)
      return <Modal open={isOpen} {...modalConfig} >
        <WrappedComponent {...this.props}  {...this.state} setIsOpen={this.setIsOpen} />
        {/* {super.render()} */}
      </Modal>
    }
  }
  WithModal.displayName = `WithModal${getDisplayName(WrappedComponent)}`

  return WithModal
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default WithModalHOC
import React from 'react';
import ModelViewer from '@metamask/logo';

class MetaMaskLogo extends React.Component {
  componentDidMount() {
    this.addModelViewer();
  }

  addModelViewer = () => {
    if (!this.viewer) {
      this.viewer = ModelViewer({
        pxNotRatio: true,
        width: 35,
        height: 35,
        followMouse: true,
      });
      this.el.appendChild(this.viewer.container);
    }
  };

//   componentWillUnmount() {
//     if (this.viewer) {
//       this.viewer.stopAnimation();
//       this.viewer = null;
//     }
//   }

  render() {
    return <div className="flex relative w-12 h-12 place-items-center pl-2 rounded-full bg-[#233447]" ref={(el) => (this.el = el)} />;
  }
}

export default MetaMaskLogo;

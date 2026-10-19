/* eslint-disable camelcase */
import React from 'react'
import Modal from 'react-modal'
import Container from './Container'
import Loader from './Loader'

const LoadingModal = ({
  modalIsOpen,
  loadingScenes
}) => {

  return (
    <Modal
      isOpen={modalIsOpen}
      style={{content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: 'none',
        background: 'transparent'
      }}}
      contentLabel="Loading Modal"
    >
      <Container>
        <div className="w-full flex flex-col items-center">
          <div className="font-console text-3xl drop-text">
            Loading...
          </div>
          <div className="w-full h-full flex flex-col md:flex-row items-center justify-around gap-2">
            {loadingScenes.map((loadingScene, index) => {
              return (
                <Loader
                  width={64 * 4}
                  message={loadingScene.message}
                  source={loadingScene.source}
                  index={index}
                />
              )
            })}
          </div>
        </div>
        
      </Container>
    </Modal>
  )
}

export default LoadingModal

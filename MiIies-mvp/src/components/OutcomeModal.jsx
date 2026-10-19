import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'
import Container from './Container'
import Outcome from './Outcome'

const OutcomeModal = ({
  modalIsOpen,
  outcomes,
  closeModal
}) => {
  const [outcomeIndex, setOutcomeIndex] = useState(0)

  useEffect(() => {
    setOutcomeIndex(0)
  }, [outcomes])

  const previous = () => {
    setOutcomeIndex(Math.max(outcomeIndex - 1, 0))
  }

  const next = () => {
    setOutcomeIndex(Math.min(outcomeIndex + 1, outcomes.length - 1))
  }

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
        background: 'transparent',
      }}}
      contentLabel="Outcome Modal"
      onRequestClose={closeModal}
    >
      <Container>
        <div className="w-full flex flex-col items-center overflow-hidden" style={{zIndex:1000}}>
          <div className="font-console text-lg drop-text text-center">
            And here's what happened...
          </div>
          <div className="w-full flex items-center justify-around ">
            {outcomeIndex > 0 ? (
              <div 
                onClick={() => previous()}
                className="cursor-pointer mr-3"
              >
                <img src="/images/arrow-left.svg" alt="previous" style={{
                  height:'30px',
                  width:'30px',
                }}/>
              </div>
            ) : (
              <div style={{width:'30px'}} className="mr-3"></div>
            )}
            {outcomes.length > 0 && (
              <Outcome 
                message={outcomes[outcomeIndex].message} 
                source={outcomes[outcomeIndex].source}
                link={outcomes[outcomeIndex].link}
                linkMessage={outcomes[outcomeIndex].linkMessage}
              />
            )}
            {outcomeIndex < outcomes.length - 1 ? (
              <div className="cursor-pointer ml-3"
                onClick={() => next()}
              >
                <img src="/images/arrow-right.svg" alt="next" style={{
                  width: '30px',
                  height:'30px'
                }}/>
              </div>
            ) : (
              <div style={{width:'30px'}} className="ml-3"></div>
            )}
          </div>
        </div>
        
      </Container>
    </Modal>
  )
}

export default OutcomeModal

import { switchToMainnet } from "../utils/ethereum"

const MainnetConnect = () => {
  return (
    <div 
      className="relative flex items-center justify-center p-2 cursor-pointer" 
      style={{
        borderImage: 'url(/images/wood-frame.svg) 10 10 10 10 stretch',
        borderWidth: '10px',
        background: 'rgba(255, 0, 0, 0.2)'
      }}
      onClick={switchToMainnet}
    >
      <div className="text-center font-console pt-1" style={{fontSize:'20px'}}>
        Switch to Avalanche
      </div>
    </div>
  )
}

export default MainnetConnect

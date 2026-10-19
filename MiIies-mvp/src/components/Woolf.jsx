import { decodeTokenURI } from "../utils/uri"
import { utils, BigNumber } from "ethers"
import { parseBigNumber } from "../utils/ethereum"

const Woolf = ({woolf, onClick, selected, stats}) => {

  //const MAXIMUM_GLOBAL_WOOL = BigNumber.from(24000000).mul(BigNumber.from(10).pow(BigNumber.from(18)))
  const MAXIMUM_GLOBAL_WOOL = BigNumber.from(2400000000).mul(BigNumber.from(10).pow(BigNumber.from(9)))

  const unclaimedWool = () => {
    if (!woolf.value) return null
    if (woolf.isSheep) {
      const woolEarned = stats ? stats.woolEarned : 0
      let duration = Math.floor(Date.now() / 1000) - woolf.value
      if (BigNumber.from(woolEarned).gte(MAXIMUM_GLOBAL_WOOL)) duration = Math.max(stats.lastClaimTimestamp - woolf.value, 0)
      const earnings = utils.parseUnits('10000', 'gwei').mul(BigNumber.from(duration)).div(BigNumber.from(24 * 60 * 60))
      return parseBigNumber(earnings, 0)
    } else {
      const woolPerAlpha = stats ? stats.woolPerAlpha : woolf.value
      const earnings = (BigNumber.from(woolPerAlpha).sub(BigNumber.from(woolf.value))).mul(BigNumber.from(woolf.alpha))
      return parseBigNumber(earnings, 0)
    }
  }

  const earnings = unclaimedWool()

  return (
    <div 
      className="mx-3 relative cursor-pointer" 
      style={{
        width:'64px', 
        height:'64px',
        border: selected ? 'solid 4px #B11D18' : '',
        padding: selected? '2px' : '10px'
      }} 
      onClick={onClick}
    >
      <img 
        src={decodeTokenURI(woolf.tokenURI).image} alt='woolf'
        style={{width:'100%', height:'100%'}}
      />
      {earnings && (
        <div className="absolute font-console text-red text-center flex items-center justify-center" style={{
          width: '100%',
          height: '14px',
          background: 'white',
          bottom:0,
          right: 0,
          fontSize: '10px'
        }}>
          {earnings}
        </div>
      )}
    </div>
  )
}

export default Woolf
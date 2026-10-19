import {useState} from 'react'
import Container from "./components/Container"
import Minting from "./components/Minting"
import Staking from "./components/Staking"
import Stats from './components/Stats'
import { useQuery } from '@apollo/client'
import { parseGraphObject, QUERY } from './utils/query'
import WoodButton from './components/WoodButton'
import {tokenURI} from "./utils/woolf"

const Page = ({wallet, chain, wool, reload}) => {

  const [tokenUris, setTokenUris] = useState({});

  const PLACEHOLDER = "data:application/json;base64,eyJuYW1lIjogIldvbGYgIzI5IiwgImRlc2NyaXB0aW9uIjogIlRob3VzYW5kcyBvZiBTaGVlcCBhbmQgV29sdmVzIGNvbXBldGUgb24gYSBmYXJtIGluIHRoZSBtZXRhdmVyc2UuIEEgdGVtcHRpbmcgcHJpemUgb2YgJFdPT0wgYXdhaXRzLCB3aXRoIGRlYWRseSBoaWdoIHN0YWtlcy4gQWxsIHRoZSBtZXRhZGF0YSBhbmQgaW1hZ2VzIGFyZSBnZW5lcmF0ZWQgYW5kIHN0b3JlZCAxMDAlIG9uLWNoYWluLiBObyBJUEZTLiBOTyBBUEkuIEp1c3QgdGhlIEF2YWxhbmNoZSBibG9ja2NoYWluLiIsICJpbWFnZSI6ICJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBEOTRiV3dnZG1WeWMybHZiajBpTVM0d0lpQmxibU52WkdsdVp6MGlhWE52TFRnNE5Ua3RNU0kvUGcwS1BDRXRMU0JIWlc1bGNtRjBiM0k2SUVGa2IySmxJRWxzYkhWemRISmhkRzl5SURFNExqRXVNU3dnVTFaSElFVjRjRzl5ZENCUWJIVm5MVWx1SUM0Z1UxWkhJRlpsY25OcGIyNDZJRFl1TURBZ1FuVnBiR1FnTUNrZ0lDMHRQZzBLUEhOMlp5QjJaWEp6YVc5dVBTSXhMakVpSUdsa1BTSkRZWEJoWHpFaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJZ2VHMXNibk02ZUd4cGJtczlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5MekU1T1RrdmVHeHBibXNpSUhnOUlqQndlQ0lnZVQwaU1IQjRJZzBLQ1NCMmFXVjNRbTk0UFNJd0lEQWdNeklnTXpJaUlITjBlV3hsUFNKbGJtRmliR1V0WW1GamEyZHliM1Z1WkRwdVpYY2dNQ0F3SURNeUlETXlPeUlnZUcxc09uTndZV05sUFNKd2NtVnpaWEoyWlNJK0RRbzhaejROQ2drOFp5QnBaRDBpY1hWbGMzUnBiMjVmZURWR1gyMWhjbXNpUGcwS0NRazhaejROQ2drSkNUeHdZWFJvSUhOMGVXeGxQU0ptYVd4c09pTXdNekF4TURRN0lpQmtQU0pOTVRjdU5pd3pNR013TERFdU1UQXlMVEF1T0RrMUxESXRNaXd5Y3kweUxUQXVPRGs0TFRJdE1tTXdMVEV1TVRBNUxEQXVPRGsxTFRJc01pMHlVekUzTGpZc01qZ3VPRGt4TERFM0xqWXNNekI2SWk4K0RRb0pDUWs4Y0dGMGFDQnpkSGxzWlQwaVptbHNiRG9qTURNd01UQTBPeUlnWkQwaVRURTFMalkzTml3eU5TNDVOemRqTFRFdU16TTJMREF0TWk0MU9TMHdMalV5TXkwekxqVXpOUzB4TGpRMk9XTXRNQzQ1TkRVdE1TNHhNRFV0TVM0ME5qVXRNaTR6TlRrdE1TNDBOalV0TXk0Mk9UVU5DZ2tKQ1Fsek1DNDFNaTB5TGpVNUxERXVORFkxTFRNdU16Y3hiRFl1TmpnNExUWXVOamc0UXpFNUxqVTROQ3c1TGprNU5pd3lNQ3c0TGprNU1pd3lNQ3czTGpreU5tTXdMVEV1TURjdE1DNDBNVFl0TWk0d056UXRNUzR4TnpJdE1pNDRNamdOQ2drSkNRbGpMVEV1TlRVNUxURXVOVFU1TFRRdU1EazJMVEV1TlRZeUxUVXVOalUwTERCRE1USXVOREUyTERVdU9EVXlMREV5TERZdU9EVTFMREV5TERjdU9USTJTRGhqTUMweUxqRXpOeXd3TGpnek5DMDBMakUwT0N3eUxqTTBPQzAxTGpZMkRRb0pDUWtKWXpNdU1ESXRNeTR3TWpNc09DNHlPRFV0TXk0d01pd3hNUzR6TURrc01DNHdNRFJETWpNdU1UWTRMRE11TnpjM0xESTBMRFV1TnpnMUxESTBMRGN1T1RJMll6QXNNaTR4TXpjdE1DNDRNeklzTkM0eE5EVXRNaTR6TkRRc05TNDJOVFpzTFRZdU5qZzRMRFl1TlRJekRRb0pDUWtKWXkwd0xqTTRPU3d3TGpNNU1TMHdMak00T1N3eExqQXlNeXd3TERFdU5ERTBZekF1TXpreExEQXVNemt4TERFdU1ESXpMREF1TXpreExERXVOREUwTERCak1DNHlOVFF0TUM0eU5UZ3NNQzR5T1RNdE1DNDFOVFVzTUM0eU9UTXRNQzQzTVRGb05BMEtDUWtKQ1dNd0xERXVNek0yTFRBdU5USXNNaTQxT1RRdE1TNDBOalVzTXk0Mk9UbERNVGd1TWpZMkxESTFMalExTXl3eE55NHdNVElzTWpVdU9UYzNMREUxTGpZM05pd3lOUzQ1TnpkTU1UVXVOamMyTERJMUxqazNOM29pTHo0TkNna0pQQzluUGcwS0NUd3ZaejROQ2p3dlp6NE5DanhuUGcwS1BDOW5QZzBLUEdjK0RRbzhMMmMrRFFvOFp6NE5Dand2Wno0TkNqeG5QZzBLUEM5blBnMEtQR2MrRFFvOEwyYytEUW84Wno0TkNqd3ZaejROQ2p4blBnMEtQQzluUGcwS1BHYytEUW84TDJjK0RRbzhaejROQ2p3dlp6NE5DanhuUGcwS1BDOW5QZzBLUEdjK0RRbzhMMmMrRFFvOFp6NE5Dand2Wno0TkNqeG5QZzBLUEM5blBnMEtQR2MrRFFvOEwyYytEUW84Wno0TkNqd3ZaejROQ2p3dmMzWm5QZzBLIiwgImF0dHJpYnV0ZXMiOlt7InRyYWl0X3R5cGUiOiJGdXIiLCJ2YWx1ZSI6IkdyYXkifSx7InRyYWl0X3R5cGUiOiJIZWFkIiwidmFsdWUiOiJCZXRhIn0seyJ0cmFpdF90eXBlIjoiRXllcyIsInZhbHVlIjoiQ2xvc2VkIn0seyJ0cmFpdF90eXBlIjoiTW91dGgiLCJ2YWx1ZSI6IlNtaXJrIn0seyJ0cmFpdF90eXBlIjoiTmVjayIsInZhbHVlIjoiVGllIn0seyJ0cmFpdF90eXBlIjoiQWxwaGEgU2NvcmUiLCJ2YWx1ZSI6IjcifSx7InRyYWl0X3R5cGUiOiJHZW5lcmF0aW9uIiwidmFsdWUiOiJHZW4gMCJ9LHsidHJhaXRfdHlwZSI6IlR5cGUiLCJ2YWx1ZSI6IldvbGYifV19"

  const enrichSome = (e, totalSupply) => {
    if (Number(e.number) + 10 <= Number(totalSupply)) {
      if (!tokenUris.hasOwnProperty(e.number)) {
        tokenURI(e.number).then(dat => {
          setTokenUris(uris => ({
            ...uris,
            [e.number]: dat
          }))
        })
      }

      return {
        ...e,
        alpha: 0,
        ears: 0,
        eyes: 0,
        feet: 0,
        fur: 0,
        head: 0,
        isSheep: true,
        mouth: 0,
        neck: 0,
        nose: 0,
        tokenURI: tokenUris.hasOwnProperty(e.number) ? tokenUris[e.number] : PLACEHOLDER
      }
    } else {
      return e;
    }
  }

  const {
    data,
    loading,
    refetch
  } = useQuery(QUERY, {
    variables: {
      wallet:wallet || ''
    },
    pollInterval: 2500,
  })

  let tokens = []
  let staked = []

  if (data) {
    tokens = [...data.tokens.map(x => parseGraphObject(x))].sort((e1, e2) => { return parseInt(e1.id, 16) - parseInt(e2.id, 16)}).map(e => enrichSome(e, data?.stat.totalSupply)).filter(e => e.isSheep != null)
    staked = [...data.stakes.map(x => parseGraphObject(x))].sort((e1, e2) => { return parseInt(e1.id, 16) - parseInt(e2.id, 16) })
  }

  return (
    <div className="w-full flex flex-col md:justify-center items-center p-5">

      <div className="title text-center justify-self-start mb-5">
        Sheep Game
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-10 w-full mb-5" style={{maxWidth:'1500px'}}>
        <div className="h-full w-full md:w-1/2 flex justify-between flex flex-col gap-5">
          <Minting wallet={wallet} chain={chain} stats={data?.stat} reload={() => {
            refetch()
            reload()
          }} woolBalance={wool}/>
        </div>
        <div className="h-full w-full md:w-1/2 flex justify-center">
          <Staking 
            wallet={wallet}
            chain={chain}
            wool={wool}
            tokens={tokens} 
            stakes={staked}
            stats={data?.stat}
            reload={() => {
              refetch()
              reload()
            }}
            fetching={loading}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-10 w-full mb-5" style={{maxWidth:'1500px'}}>
          <div className="h-full w-full md:w-1/2 flex justify-between flex flex-col gap-5">
            <Stats stats={data?.stat} users={data?.users} />
          </div>
      </div>

      <div className="mb-5 font-console text-red text-sm" style={{maxWidth:'600px'}}>
        <Container transparent={false}>
          <div className="flex flex-col jsutify-center items-center">
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 mb-2">
              <WoodButton width={150} height={50} title={'Whitepaper'} fontSize={15} onClick={() => {
                window.location.href = "./whitepaper";
              }}/>
              <img src="/images/public-domain.png" style={{maxHeight:'50px'}} alt="public domain" />
            </div>
            <a className="underline" href="./tos" target="_blank" >terms of service</a>
          </div>
        </Container>
      </div>

      <div style={{position: 'absolute', top: 0, left: 0}}>
        <img src="/images/sheep.gif" style={{maxHeight: '50px'}} alt="sheep-love" />
      </div>
      <div style={{position: 'absolute', top: 0, right: 0}}>
        <img src="/images/land.gif" style={{maxHeight: '50px'}} alt="land" />
      </div>
    </div>
  )
}

// <img className="absolute h-full w-full object-cover" src="/images/background.png" alt="" style={{zIndex:-1000}}/>

export default Page

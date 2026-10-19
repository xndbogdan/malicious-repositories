const Whitepaper = () => {

  return (
    <div className="w-full h-full md:p-5 flex justify-center" style={{background:'rgba(0,0,0,.9)', fontFamily:'PressStart', color:'#24D336'}}>
      <div className="flex flex-col gap-5" style={{maxWidth:'1000px'}}>
        <h1 className="subtitle">Sheep Game</h1>
      ​
        <p>
          Wolf.Game pioneered new types of NFT mechanics
          BUT
          SheepGame brings it to Avalanche!
        </p>


        <p>
          Fully decentralized. Low Fees and Sub Second Finality and fully functional!
SheepGame shows what’s possible with interactions between the ERC-20 and ERC-721 protocols on Avalanche.
For the very first time, your NFT can steal other NFTs (ERC-721) for you. The rarer your NFT, the more tokens you'll accumulate probabilistically!

        </p>

        <p>
          <h4>The tl;dr:</h4>
            &emsp;- There will only ever be 10,000 Gen Zero, minted with AVAX, TRACTOR or JOE. The 40,000 Gen 1 are minted by farming $aWOOL<br/>
            &emsp;- Sheep can be staked in the Barn to earn $aWOOL and pay a tax anytime they claim their $aWOOL earnings<br/>
            &emsp;- If a Sheep is unstaked from the Barn, the Wolves try to steal all of its accumulated $aWOOL<br/>
            &emsp;- When a new Sheep is born, the Wolves attempt to kidnap it. If they’re successful, it’s given to a randomly selected Wolf, instead of the owner who minted it<br/>        
        </p>

        <h3 className="drop-text">Contract Addresses</h3>

        <p>
          &emsp;- Sheep / Wolf NFT: 0x6791f4e53452d55c1d132374eC8456D9880Aa6aF<br/>
          &emsp;- Barn / Gang Staking: 0x262D7e2dF7B08534015bc7cF259d9186726849C2<br/>
          &emsp;- $aWOOL Token: 0x5eDE350E84223fb50775fD91a723F2ca71034cf7
        </p>

        <div className="flex justify-center items-center gap-5">
          <img src="/images/minting.gif" style={{height:'100px'}} className="object-contain" alt=""/>
          <h3 className="drop-text">Minting</h3>
          <img src="/images/minting.gif" style={{height:'100px'}} className="object-contain" alt=""/>
        </div>
        
        <table frame="void" rules="all">
          <tr>
            <th>Token ID</th>
            <th>Minting Cost</th>
          </tr>
          <tr>
            <td>1 to 10,000 (Gen 0)</td>
            <td>2 AVAX or equivalent of 2 AVAX in JOE/TRACTOR</td>
          </tr>
          <tr>
            <td>10,001 to 20,000</td>
            <td>20,000 $aWOOL</td>
          </tr>
          <tr>
            <td>20,001 to 40,000</td>
            <td>40,000 $aWOOL</td>
          </tr>
          <tr>
            <td>40,001 to 50,000</td>
            <td>80,000 $aWOOL</td>
          </tr>
        </table>

        <p>
          The total cost to mint all of the Sheep and Wolves in existence will be 1,800,000,000 $aWOOL.
        </p>

        <div className="flex justify-center items-center gap-5">
          <img src="/images/unstaking-barn.gif" style={{height:'100px'}} className="object-contain" alt=""/>
          <h3 className="drop-text">Sheep</h3>
          <img src="/images/staked-barn.gif" style={{height:'100px'}} className="object-contain" alt=""/>
        </div>
        <p>
          You have a 90% chance of minting a Sheep, each with unique traits. Here are the actions they can take:
        </p>

        <table frame="void" rules="all">
          <tr>
            <th>Action</th>
            <th>Notes</th>
            <th>Risk</th>
          </tr>
          <tr>
            <td>Enter Barn (Stake)</td>
            <td>Accumulate 10,000 $aWOOL / day (prorated to the second)</td>
            <td>No risk.</td>
          </tr>
          <tr>
            <td>Shear $aWOOL (Claim)</td>
            <td>Receive 80% of $aWOOL accumulated on your Sheep</td>
            <td>Wolves take a guaranteed 20% tax on sheared $aWOOL in return for not attacking the Barn. Taxed $aWOOL is split among all the Wolves currently staked in the Barn, proportional to their Alpha scores.</td>
          </tr>
          <tr>
            <td>Leave Barn (Unstake)</td>
            <td>Sheep is removed from the Barn and all $aWOOL is shorn. <span className="underline"> Can only be done if the Sheep has accumulated 2 days worth of $aWOOL to keep it warm.</span></td>
            <td>50% chance of ALL of your accumulated $aWOOL being stolen by Wolves. Stolen $aWOOL is split among all the Wolves currently staked in the Barn, proportional to their Alpha scores.</td>
          </tr>
        </table>
        ​
        <div className="flex justify-center items-center gap-5">
          <img src="/images/shearing.gif" style={{height:'100px'}} className="object-contain" alt=""/>
          <h3 className="drop-text">$aWOOL</h3>
          <img src="/images/claiming-pack.gif" style={{height:'100px'}} className="object-contain" alt=""/>
        </div>
        <p>
          The maximum $aWOOL supply is 5,000,000,000 $aWOOL:
        </p>
        <ul>
          <li>When supply reaches 2,400,000,000 $aWOOL earned for staking, the staking “faucet” turns off.</li>
          <li>The developers will receive 600,000,000 $aWOOL which is VESTED over 3 months</li>
          <li>Community Rewards will be allocated 2,000,000,000 $aWOOL</li>
        </ul>

        <p>A Roadmap is in the Works and we have big Plans for the SheepGame so stay tuned and follow us on Twitter and join our Discord!</p>

        <table frame="void" rules="all">
          <tr>
            <th>Action</th>
            <th>Notes</th>
            <th>Risk</th>
          </tr>
          <tr>
            <td>Mint a new Sheep using $aWOOL</td>
            <td>There is a 10% chance that the NFT is actually a Wolf!</td>
            <td>10% chance of the new Sheep or Wolf being stolen by a staked Wolf. Each Wolf’s chance of success is proportional to their Alpha scores.</td>
          </tr>
        </table>

        <div className="flex justify-center items-center gap-5">
          <img src="/images/staking-pack.gif" style={{height:'100px'}} className="object-contain" alt=""/>
          <h3 className="drop-text">Wolves</h3>
          <img src="/images/unstaked-pack.gif" style={{height:'100px'}} className="object-contain" alt=""/>
        </div>
        <p>
          You have a 10% chance of minting a Wolf, each with unique traits, including an Alpha value ranging from 5 to 8. The higher the Alpha value:<br/>
          &emsp;- The higher the portion of $aWOOL that the Wolf earns from taxes<br/>
          &emsp;- The higher chance of stealing a newly minted Sheep or Wolf
        </p>

        <p>
          <h4>Example:</h4> Wolf A has an Alpha of 8 and Wolf B has an Alpha of 6, and they are staked.<br/>
          &emsp;- If 70,000 $aWOOL total have been accumulated as taxes, Wolf A will be able to claim 40,000 $aWOOL and Wolf B will be able to claim 30,000 $aWOOL<br/>
          &emsp;- If a newly minted Sheep or Wolf is stolen, Wolf A has a 57% chance of receiving it and Wolf B has a 43% chance of receiving it<br/>
        </p>

        <p className="underline">
          Only staked Wolves are able to steal a sheep or earn the $aWOOL tax.
        </p>

        <table frame="void" rules="all">
          <tr>
            <th>Action</th>
            <th>Notes</th>
            <th>Risk</th>
          </tr>
          <tr>
            <td>Stake Wolf</td>
            <td>Earn your share of the 20% tax of all $aWOOL generated by Sheep in the Barn</td>
            <td>No risk.</td>
          </tr>
          <tr>
            <td>Claim $aWOOL</td>
            <td>Receive all $aWOOL taxes accrued for the staked Wolf</td>
            <td>No risk.</td>
          </tr><tr>
            <td>Unstake Wolf</td>
            <td>Receive all $aWOOL taxes accrued for the staked Wolf</td>
            <td>No risk.</td>
          </tr>
        </table>

      </div>
    </div>
  )
}

export default Whitepaper
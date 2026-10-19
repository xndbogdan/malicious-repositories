import gql from "graphql-tag";

export const QUERY = gql`
  query fetch($wallet: String) {
    tokens(
      where: { owner: $wallet }
      orderBy: number
      orderDirection: asc
      first: 1000
    ) {
      id
      owner {
        id
      }
      number
      isSheep
      fur
      head
      ears
      eyes
      nose
      mouth
      neck
      feet
      alpha
      tokenURI
    }
    stakes(
      where: { owner: $wallet }
      first: 1000
      orderBy: id
      orderDirection: asc
    ) {
      id
      owner {
        id
      }
      token {
        number
        isSheep
        fur
        head
        ears
        eyes
        nose
        mouth
        neck
        feet
        alpha
        tokenURI
      }
      value
    }
    stat(id: "global") {
      sheepMinted
      sheepStaked
      wolvesMinted
      wolvesStaked
      woolClaimed
      woolPerAlpha
      maxTokens
      lastClaimTimestamp
      woolStolen
      woolEarned
      totalSupply
    }
    users(orderBy: claimedWool, orderDirection: desc, first: 10) {
      id
      claimedWool
      tokens {
        id
        isSheep
      }
    }
    _meta {
      block {
        number
      }
    }
  }
`;

// * OG
// export const QUERY = gql`
//   query fetch($wallet: String) {
//     tokens(
//       where: { owner: $wallet }
//       orderBy: number
//       orderDirection: asc
//       first: 1000
//     ) {
//       id
//       owner {
//         id
//       }
//       number
//       isSheep
//       fur
//       head
//       ears
//       eyes
//       nose
//       mouth
//       neck
//       feet
//       alpha
//       tokenURI
//     }
//     stakes(
//       where: { owner: $wallet }
//       first: 1000
//       orderBy: id
//       orderDirection: asc
//     ) {
//       id
//       owner {
//         id
//       }
//       token {
//         number
//         isSheep
//         fur
//         head
//         ears
//         eyes
//         nose
//         mouth
//         neck
//         feet
//         alpha
//         tokenURI
//       }
//       value
//     }
//     stat(id: "global") {
//       sheepMinted
//       sheepStaked
//       wolvesMinted
//       wolvesStaked
//       woolClaimed
//       woolPerAlpha
//       maxTokens
//       woolEarned
//       lastClaimTimestamp
//       woolStolen
//       woolTaxed
//       sheepStolen
//       wolvesStolen
//     }
//     users(orderBy: claimedWool, orderDirection: desc, first: 10) {
//       id
//       claimedWool
//       tokens {
//         id
//         isSheep
//       }
//     }
//     _meta {
//       block {
//         number
//       }
//     }
//   }
// `;

export const parseGraphObject = (woolfOrStake) => {
  if (woolfOrStake.value) {
    return { ...woolfOrStake, ...woolfOrStake.token };
  }
  return woolfOrStake;
};

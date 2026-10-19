export const decodeTokenURI = (tokenURI) => {
  const encoded = tokenURI.replace('data:application/json;base64,', '')
  const buffer = Buffer.from(encoded, 'base64')
  return JSON.parse(buffer.toString('ascii'))
}

export const decodeSVG = (svg) => {
  const encoded = svg.replace('data:image/svg+xml;base64,', '')
  const buffer = Buffer.from(encoded, 'base64')
  return buffer.toString('ascii')
}

export const getSVG = (tokenURI) => {
  const decodedURI = decodeTokenURI(tokenURI)
  return decodeSVG(decodedURI.image)
}

export const isSheep = (tokenURI) => {
  const decodedURI = decodeTokenURI(tokenURI)
  return decodedURI.name.includes('Sheep')
}
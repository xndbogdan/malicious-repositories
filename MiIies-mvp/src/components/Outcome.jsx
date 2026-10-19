const Outcome = ({message, source, link,  linkMessage}) => {
  return (
    <div className="w-full flex flex-col items-center justify-around" style={{maxWidth:'400px'}}>
      {source && (
        <img 
          src={source} alt=''
          style={{objectFit:'contain', width:64 * 4}}
        />
      )}
      <div className="text-center font-console text-sm mt-5" style={{width:64 * 4}}>
        {message}
      </div>
      {link && (
        <a className="underline font-console text-xs text-red" href={link} target="_blank" rel="noreferrer">{linkMessage}</a>
      )}
      
    </div>
  )

}

export default Outcome
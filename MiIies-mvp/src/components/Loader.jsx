const Loader = ({message, source, width, index}) => {
  return (
    <div className="flex flex-col justify-center items-center" key={index}>
      <img 
        src={source} alt=''
        style={{width}}
        className="object-contain"
      />
      <div className="text-center font-console text-sm mt-4" style={{width}}>
        {message}
      </div>
    </div>
  )

}

export default Loader
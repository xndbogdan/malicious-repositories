const WoodButton = ({width, height, fontSize=null, title, onClick, loading=false, disabled=false}) => {

  return (
    <div 
      className={`relative flex items-center justify-center ${!loading && !disabled && "cursor-pointer"} ${disabled && "cursor-not-allowed"}`}
      style={{
        width:`${width}px`, 
        height:`${height}px`,
        borderImage: 'url(/images/wood-frame.svg)',
        borderImageSlice: 5,
        borderWidth: '10px',
      }}
      onClick={() => {
        if (loading) return
        onClick()
      }}
    >
      {!loading ? (
        <div className="text-center font-console pt-1" style={{fontSize:fontSize || `${height / 3 * 2}px`}}>
          {title}
        </div>
      ) : (
        <div className="text-center font-console pt-1" style={{fontSize:fontSize || `${height / 3 * 2}px`}}>
          ...
        </div>
      )}
      
    </div>
  )

}

export default WoodButton
const Container = ({children, transparent=true}) => {

  return (
    <div 
      className="w-full h-full relative flex p-1 md:p-5 flex justify-center overflow-hidden" 
      style={{
        borderImage: 'url(/images/wood-frame.svg) 30 30 30 30 stretch',
        borderWidth: '30px',
        background: `rgba(237, 227, 209, ${transparent ? 0.8 : 1.0})`
      }}
    >
      <div 
        className="absolute" 
        style={{
          width: '120%',
          height: '120%',
          top: '-20px',
          left: '-20px',
          opacity: transparent ? '8%' : '4%',
          backgroundImage:'url(/images/wood-mask.svg)',
          backgroundRepeat:'repeat',
          backgroundSize: '400px 268px'
        }}
      ></div>
      <div className="w-full h-full z-index:5 relative">
        {children}
      </div>
      
    </div>
  )

}

export default Container
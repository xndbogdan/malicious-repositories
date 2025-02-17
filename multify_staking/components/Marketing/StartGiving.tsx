function StartGiving() {
  return (
    <section className="flex justify-between w-full px-5 py-24">
      <div className="bg-[url('/assets/imgs/bg-gifts.png')] bg-no-repeat bg-bottom bg-contain text-center border border-teal rounded-lg p-6 md:p-16 py-20 md:py-21 mx-auto w-full max-w-6xl">
        <h4 className="text-white text-xl md:text-3xl pb-5">Start giving rewards today!</h4>
        <p className="text-base text-gray w-80 mx-auto">Lorem ipsum reward is waiting for you after profile completion!</p>
        <button className="buttonTertiary">Subscribe</button>
      </div>
    </section>
  )
}

export default StartGiving
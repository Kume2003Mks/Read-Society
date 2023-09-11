import style from '../../Style/Component_Gobal.module.css'

const Book_Card: JSX.ElementType = () => {
  return (
    <div className='p-2 h-auto justify-center rounded-lg cursor-pointer flex flex-col flex-1 snap-start'>
      {/**category label*/}
      <h1 className='text-xs text-slate-500 text-right w-fill'>Book_Card</h1>
      {/**card */}

      <div className={`p-2 h-fill w-fill justify-center rounded-lg cursor-pointer bg-slate-300 hover:bg-slate-400`}>
            <div>
                <img src={'https://images.gr-assets.com/books/1255614970l/2.jpg'} alt={'props.authors'} className={`w-full h-auto rounded-lg ${style.A4_Size}`} />
                <div className='mt-1'>
                    <p className='text-sm truncate'>Harry Potter</p>
                    <p className='text-xs text-slate-500'>jkk</p>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Book_Card
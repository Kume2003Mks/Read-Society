import styles from '../../Style/Component.module.css'

const Book_Card: JSX.ElementType = () => {
  return (
    <div className='px-2 pb-2 h-auto justify-center rounded-lg cursor-pointer flex flex-col flex-1 snap-start hover:bg-slate-300'>
      {/**category label*/}
      <h1 className='text-xs text-black text-right bg-rose-400 w-fit self-end px-1 pt-1 rounded-t-lg'>Novel</h1>
      {/**card */}
      <div className={`h-fill w-fill justify-center cursor-pointer `}>
            <div>
                <img src={'https://images.gr-assets.com/books/1255614970l/2.jpg'} alt={'props.authors'} className={`w-full h-auto rounded-b-lg object-cover ${styles.A4_Size}`} />
                <div className='mt-1'>
                    <p className='text-sm truncate'>Harry Potter</p>
                    <p className='text-xs text-slate-500'>Sato nakimi</p>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Book_Card
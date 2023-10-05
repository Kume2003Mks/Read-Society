import style from '../../Style/Component_Gobal.module.css'
import styles from '../../Style/Component_Gobal.module.css'
const Book_CardTT: JSX.ElementType = ({BCT,IMGT,BCT1,TTT,color}:any) => {
  return (
    <div className='px-2 pb-2 h-auto justify-center rounded-lg cursor-pointer flex flex-col flex-1 snap-start hover:bg-slate-300'>
      {/**category label*/}
      <h1 className='text-xs text-black text-right bg-rose-400 w-fit self-end px-1 pt-1 rounded-t-lg' style={{backgroundColor:color}}>{TTT}</h1>
      {/**card */}
      <div className={`h-fill w-fill justify-center cursor-pointer `}>
            <div>
                <img src={IMGT} alt={'props.authors'} className={`w-full h-auto rounded-b-lg ${style.A4_Size}`} />
                <div className='mt-1 text-sm truncate'>
                    <p className={styles.header}>{BCT}</p>
                    <div className='text-xs text-slate-500'>
                        <p style={{fontSize:"0.75rem"}} className={styles.header}>{BCT1}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Book_CardTT
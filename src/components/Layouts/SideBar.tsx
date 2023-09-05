
const SideBar: JSX.ElementType = ({style, children, className}:any) => {
  return (
    <>
      <div className={`xl:w-2/12 h-full flex pt-5 shadow-3xl flex-col md:w-1/5 ${className}`} style={style}>
        {children}
      </div>
    </>

  )
}

export default SideBar
import '../../Style/Global.css'

interface SideBarProps{
    style?: React.CSSProperties;
    className?: string;
    children: React.ReactNode;
}
const SideBar: React.FC<SideBarProps> = ({style, children, className}) => {
  return (
    <>
      <div className={`sidebar-bg xl:w-[18%] h-full flex pt-5 shadow-3xl flex-col md:w-1/5 ${className}`} style={style}>
        {children}
      </div>
    </>

  )
}

export default SideBar
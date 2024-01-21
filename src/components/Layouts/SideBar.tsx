import SideStyle from './Layout.module.css'

interface SideBarProps{
    style?: React.CSSProperties;
    className?: string;
    children: React.ReactNode;
}
const SideBar: React.FC<SideBarProps> = ({style, children, className}) => {
  return (
    <>
      <div className={`${SideStyle.sidebar} shadow-3xl ${className}`} style={style}>
        {children}
      </div>
    </>

  )
}

export default SideBar
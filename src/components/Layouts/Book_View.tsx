import { ReactNode } from "react";
import Style from './Layout.module.css'


interface BookViewProps {
    title: string;
    className?: string;
    children: ReactNode;
}

const Book_View: React.FC<BookViewProps> = ({ children, title, className }) => {

    return (
        <div className='items-center flex mt-4 flex-col px-12'>
            <div className='w-full'>
                <p className='text-xl'>{title}</p>
            </div>
            <div className={Style.line} />
            <div className={`w-full ${className}`}>
                {children}
            </div>
        </div>
    )
}

export default Book_View
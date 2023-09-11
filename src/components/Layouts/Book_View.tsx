const Book_View: JSX.ElementType = ({ children, title, className }: any) => {

    return (
        <div className='items-center flex mt-4 flex-col px-12'>
            <div className='w-full'>
                <p className='text-xl'>{title}</p>
            </div>
            <div className='w-full my-2 border-t-2 border-black' />
            <div className={`w-full ${className}`}>
                {children}
            </div>
        </div>
    )
}

export default Book_View
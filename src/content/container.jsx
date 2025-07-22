function container({children}) {
    return (
        <div className="flex-grow p-4 overflow-auto">
            {children}
        </div>
    )
}
            export default container
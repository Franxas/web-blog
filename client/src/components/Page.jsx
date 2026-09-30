
export default function Page(props) {
    
    const CurrentPage = props.currentPage;

    return (
        <div className="mainpage">
            <CurrentPage/>
        </div>
    )
}

export default function Page(props) {

    const CurrentPage = props.currentPage;
2
    return (
        <div className="mainpage">
            <CurrentPage/>
        </div>
    )
}
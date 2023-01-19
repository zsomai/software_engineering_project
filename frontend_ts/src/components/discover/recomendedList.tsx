import { IRecommandationList } from "./interfaces.jsx"
import Book from "./Book"

interface RListProps {
    list: IRecommandationList
    userID: string
}

const RecommendedList = ({list, userID}:RListProps) => {
    return (
        <div className="recommended-list">
            <div className="title">{list.title}</div>
            <div className="list">
                {list.similarBooks.map((book) => {
                    return <Book book = {book} userID={userID}/>
                })}
            </div>
        </div>
    )
}

export default RecommendedList
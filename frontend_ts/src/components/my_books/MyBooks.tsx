import { useEffect, useState } from "react";
import BookListView from "./genericBookList";
import { IContent } from "./interface";
import axios from "axios";


interface IProps {
    wishlistLink: string
    readingLink: string
    readLink: string
    userID: string
}


const MyBooks = ({wishlistLink, readingLink, readLink, userID}:IProps) => {
    const [wishlist, setWishlist] = useState<IContent>();
    const [reading, setReading] = useState<IContent>();
    const [done, setDone] = useState<IContent>();

    const load = async(link:string, func:React.Dispatch<React.SetStateAction<IContent | undefined>>, title:string) => {
        console.log("asdlasmdlasdmasl", title);
        
        await axios
            .get(link)
            .then((res) => {
                console.log(res.data);
                
                func({"title": title, "bookList":res.data})
            })
    }
    useEffect(()=> {
        load(wishlistLink, setWishlist,"Books you're interested in:")
        load(readingLink, setReading, "Books you're reading at the moment:")
        load(readLink, setDone, "Books you've read in the past:")
    }, [])
    return (
        <div>
            <BookListView key={1} userID={userID} data={wishlist} reloadWishlist={()=>load(wishlistLink, setWishlist, "Books you're interested in:")} reloadReading={()=> load(readingLink, setReading, "Books you're reading at the moment:")} listType="wishlist"/>
            <BookListView key={2} userID={userID} data={reading} reloadDone={()=>load(readLink, setDone, "Books you've read in the past:")} reloadReading={()=> load(readingLink, setReading, "Books you're reading at the moment:")} listType="reading"/>
            <BookListView key={3} userID={userID} data={done} listType="normal"/>
        </div>
    )
}

export default MyBooks;
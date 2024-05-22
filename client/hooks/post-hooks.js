import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useStores from "../store"
import { useEffect, useState } from "react";


export const usePosts = ({writerId}) => {
    const {setIsLoading} = useStores();

    const location = useLocation();
    const navigate = useNavigate();

    const [ searchParams ] = useSearchParams();

    const [ page, setPage ] = useState(searchParams.get("page") || 1 );
    cosnt [MdCategory, setCategory ] = useState(searchParams.get("cat") || " ");

    const [ posts, setPosts ] = useState([]);
    const [numOfPages, setNumOfPages ] = useState(1);

    useEffect(()=> {
        const fetchPosts = async() => {
            updateURL
        }
    
    },[]);
}
import { useState, useEffect } from "react";
import axios from 'axios'

const useAxios = ({url, method, body = null, headers = null}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const response = await axios[method](url, JSON.parse(headers), JSON.parse(body))

                setData(response.data)
            } catch (error) {
                setError(error)
            }

            setLoading(false)
        }
        fetchData()
    }, [url, method, body, headers])


    const reFetch = async () => {
        setLoading(true)
        try {
            const response = await axios.get(url)
            setData(response.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return { data, loading, error, reFetch }
}

export default useAxios
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
const useReviews = () => {
    const axiosSecure = useAxiosPrivate();

    const {data: reviews = [], refetch} = useQuery({
        queryKey: ["reviews"],
        queryFn: async()=>{
            const res = await axiosSecure.get('/reviews');
            return res.data;
        }
    });
    return [reviews, refetch];
};

export default useReviews;
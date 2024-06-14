import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useScholarships = () => {
  const axiosSecure = useAxiosPrivate();
  const { data: scholarships = [], refetch } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return res.data;
    },
  });
  return [scholarships, refetch];
};

export default useScholarships;

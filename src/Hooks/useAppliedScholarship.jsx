import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useAppliedScholarship = () => {
    const { user } = useAuth();
  const axiosSecure = useAxiosPrivate();

  const { data: appliedScholarship = [], refetch } = useQuery({
    queryKey: ["appliedScholarship", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appliedScholarship/${user.email}`);
      return res.data;
    },
    
  });
    return [appliedScholarship, refetch]
};

export default useAppliedScholarship;
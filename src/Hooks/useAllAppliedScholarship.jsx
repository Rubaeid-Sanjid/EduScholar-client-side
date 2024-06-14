import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useAllAppliedScholarship = () => {
  const axiosSecure = useAxiosPrivate();

  const { data: allAppliedScholarship = [], refetch } = useQuery({
    queryKey: ["allAppliedScholarship"],
    queryFn: async () => {
      const res = await axiosSecure.get("/appliedScholarship");
      return res.data;
    },
  });
  return [allAppliedScholarship, refetch];
};

export default useAllAppliedScholarship;

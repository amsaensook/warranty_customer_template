import { useQuery, useMutation, useQueryClient } from "react-query";
import { httpClient } from "../services/axios";

export const useServiceCategories = () => {
  const getServiceCategories = async () => {
    return await httpClient.get('/servicecategories');
  };
  return useQuery(
    "ServiceCategories",
    () => getServiceCategories(),
    {
      enabled: true,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      //staleTime: 30000, // not to refresh the data from API is 30 seconds
    }
  );
};


import { useQuery, useMutation, useQueryClient } from "react-query";
import { httpClient } from "../services/axios";


export const useProductListWarrantyDes = () => {
  const getProductListWarrantyDes = async (params: any) => {
    return await httpClient.get('/productlist_warrantydes?warrantyid='+params);
  };

  return useMutation<any, any, any>(
    "getProductListWarrantyDes",
    (params) => getProductListWarrantyDes(params),
    {
      onSuccess: (response) => {

        //  console.log(response);

      },
      onError: (error) => {

        console.log(error);

      },
    }
  ); 
};

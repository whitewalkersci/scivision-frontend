import { useQuery } from "@tanstack/react-query";
import { useUserData } from "../zustand/userStore";
import {
  fetchAnnotationsSimulation,
  fetchModelReport,
  getModelTrainingStatus,
} from "./ApiCalls";
import { useMemo } from "react";
import { useTrainModelStore } from "../zustand/trainModelStore";

export const useModelTrainingStatus = (options = {}) => {
  const username = useUserData((state) => state.username);
  const user_id = useUserData((state) => state.user_id);
  const userInfo = useMemo(() => ({ username, user_id }), [username, user_id]); // Correct dependency array
  const queryKey = ["modelStatus", username, user_id];
  return useQuery({
    queryKey,
    queryFn: () => getModelTrainingStatus({ ...userInfo }),
    ...options,
  });
};

export const useModelReportData = (options = {}) => {
  const username = useUserData((state) => state.username);
  const user_id = useUserData((state) => state.user_id);
  const model_id = useTrainModelStore((state) => state.ai_model_name);
  const project_name = useTrainModelStore((state) => state.project_name);

  return useQuery({
    queryKey: ["modelreport"],
    queryFn: () => fetchModelReport({model_id, project_name, username, user_id}),
    ...options,
  });
};

//TODO:fixation for  refetching
export const useFetchAnnotationsData = ({
  images,
  setImages,
  setRectangles,
  setClassList,
  ...options
}) => {
  const ai_model_name = useTrainModelStore((state) => state.ai_model_name);
  const project_name = useTrainModelStore((state) => state.project_name);
  const user_id = useUserData((state) => state.user_id);

  return useQuery({
    queryKey: ["fetchAnnotationsSimulation"],
    queryFn: async () => {
      const resp = await fetchAnnotationsSimulation({
        user_id,
        project_name,
        model_id:ai_model_name,
      });
      console.log("fetchAnnotationsSimulation----------->", resp);
      const class_names = new Set();
      const updatedImages = images.map((image) => {
        console.log("fetchAnnotationsSimulation----------->", image);
        let annotation = resp.detections[image?.name];
        console.log("annotation-------->", annotation);
        const updated_result = annotation.map((val, index) => {
          class_names.add(val.class);
          return {
            ...val,
            selectedClassname: val.class_id,
            id: `react-new-${Math.random().toString(36).substring(2, 9)}`,
          };
        });

        console.log("updated_result--------->", updated_result);

        if (!updated_result.length) {
          console.error("api annotation not found");
        }
        setRectangles(updated_result);
        return { ...image, annotations: updated_result };
      });
      console.log("class_names------>", class_names);

      setImages(updatedImages);
      setFetchRespData(updatedImages);
      setClassList([...class_names]);

      return resp;
    },
    staleTime: Infinity,
    cacheTime: 5 * 10000,
    ...options,
  });
};

import AxiosInstance from "../axios/AxiosInstance";

export const getModelTrainingStatus = async ({ username, user_id }) => {
  try {
    const resp = await AxiosInstance.post("/model_training_status", {
      username,
      user_id,
    });
    // console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchAnnotationsSimulation = async ({
  user_id,
  project_name,
  model_id,
  val_url_dic,
}) => {
  try {
    const resp = await AxiosInstance.post("/infer_val_images", {
      project_name,
      user_id,
      model_id,
      val_url_dic,
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAnnotationsReview = async ({
  user_id,
  project_name,
  model_id,
  inference_url_dic,
}) => {
  try {
    const resp = await AxiosInstance.post("/inference_images", {
      project_name,
      user_id,
      model_id,
      inference_url_dic,
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchModelReport = async ({
  model_id,
  project_name,
  username,
  user_id,
}) => {
  try {
    const resp = await AxiosInstance.post("/model_metrics", {
      model_id: model_id,
      project_name: project_name,
      username,
      user_id,
      metric_type: ["training", "validation"],
    });
    return resp.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

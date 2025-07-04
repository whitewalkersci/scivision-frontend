// store/trainModelStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTrainModelStore = create(
  persist(
    (set) => ({
      ai_model_name: "",
      project_name: "",
      bucket_name: "",
      folder_name: "",
      classname: [],
      annotations: {},
      data_type: "",
      creation_date: "",

      // Actions
      setAiModelName: (name) => set({ ai_model_name: name }),
      setProjectName: (name) => set({ project_name: name }),
      setBucketName: (name) => set({ bucket_name: name }),
      setFolderName: (name) => set({ folder_name: name }),
      setClassname: (classes) => set({ classname: classes }),
      setDataType: (data_type) => set({ data_type: data_type }),
      setAnnotation: (annotations) => set({ annotations: annotations }),
      setCreationDate: (newDate) => set({ creation_date: newDate }),

      // addAnnotation: (image, annotation) =>
      //   set((state) => ({
      //     annotations: {
      //       ...state.annotations,
      //       [image]: [...(state.annotations[image] || []), annotation],
      //     },
      //   })),

      // clearAnnotations: () => set({ annotations: {} }),
    }),
    {
      name: "train-model-storage", // key in localStorage
    }
  )
);

export const useGCSUrlStore = create(
  persist((set) => ({
    upload_data: {},
    setUploadGCSData: (newData) => {
      set({ upload_data: newData });
    },
  }))
);

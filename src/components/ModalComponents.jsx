import Modal from "./Modal";
import { InfinityLoader } from "./Loader";

export const LoadingModal = ({
  IsModalOpen,
  closeModal,
  HeadLine,
  BottomLine,
  TotalFileLength,
  FileUploadCount,
}) => {
  return (
    <>
      <Modal
        isOpen={IsModalOpen}
        onClose={closeModal}
        OuterParentClass={
          "w-full h-[45dvh] transition-all ease-in-out  relative "
        }
        WindowSize={" min-w-[60%] "}
        HideClose={"hidden"}
      >
        <div className="w-full flex flex-col items-center justify-evenly h-full place-content-start gap-10 ">
          <h1 className="text-4xl text-center text-GlobalPrimary">
            {HeadLine}
          </h1>
          <div className="w-full flex items-center justify-center ">
            <InfinityLoader />
          </div>
          <p
            className={`w-full text-center text-3xl text-GlobalPrimary flex flex-col gap-4 ${
              IsModalOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {BottomLine}
            {TotalFileLength > 1 ? (
              <span>
                ({FileUploadCount}/{TotalFileLength})
              </span>
            ) : null}
          </p>
        </div>
      </Modal>
    </>
  );
};

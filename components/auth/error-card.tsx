

import { CardWrapper } from "./card-wrapper";

import { FiAlertTriangle } from "react-icons/fi";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <FiAlertTriangle className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

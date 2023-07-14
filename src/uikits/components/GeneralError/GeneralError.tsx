import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

import type React from "react";

type GeneralErrorProps = {
  title: string;
  description: string;
};

const GeneralError: React.FC<GeneralErrorProps> = ({ title, description }) => {
  return (
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export { GeneralError };

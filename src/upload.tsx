import { ChangeEvent, FC } from "react";
import { Input, Text } from "@chakra-ui/react";
import { customPlanetConfig, PlanetUploadProps } from "./config";

export const Upload: FC = () => {
  let fileReader: FileReader;

  const handleFileRead = () => {
    const content = fileReader.result;
    const contentAsJson = JSON.parse(content as string);
    contentAsJson.forEach((planetProps: PlanetUploadProps) => {
      customPlanetConfig.push(planetProps);
    });
  };

  const handleFileChosen = (e: ChangeEvent<HTMLInputElement>) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    if (e.target.files) fileReader.readAsText(e.target.files[0]);
  };

  return (
    <>
      <Text>Upload JSON config file</Text>
      <Input type="file" accept=".json" onChange={(e) => handleFileChosen(e)} />
    </>
  );
};

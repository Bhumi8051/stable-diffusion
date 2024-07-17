import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Stack, 
  Image,
  Link,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import { useState } from "react";

const App = () => {
  const [image, updateImage] = useState(null);
  const [prompt, updatePrompt] = useState("");
  const [loading, updateLoading] = useState(false);

  const generate = async (prompt) => {
    updateLoading(true);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
      {
        headers: {
          Authorization: "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", // Replace with your actual token
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );
    const result = await response.blob();
    const reader = new FileReader();
    reader.onloadend = () => {
      updateImage(reader.result);
      updateLoading(false);
    };
    reader.readAsDataURL(result);
  };

  return (
    <ChakraProvider>
      <Container>
        <Heading>Stable Diffusion🚀</Heading>
        <Text marginBottom={"10px"}>
          This React application leverages the model trained by Stability AI and
          Runway ML to generate images using the Stable Diffusion Deep Learning
          model. The model can be found via GitHub here{" "}
          <Link href={"https://github.com/CompVis/stable-diffusion"}>
            Github Repo
          </Link>
        </Text>

        <Wrap marginBottom={"10px"}>
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"350px"}
          ></Input>
          <Button onClick={() => generate(prompt)} colorScheme={"yellow"}>
            Generate
          </Button>
        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : image ? (
          <Image src={image} boxShadow="lg" />
        ) : null}
      </Container>
    </ChakraProvider>
  );
};

export default App;
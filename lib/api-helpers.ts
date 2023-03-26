import axios, { AxiosError } from "axios";

export const generatePrompt = async (
  userInput: string,
  promptMode: string
): Promise<string> => {
  try {
    const apiURL = "/api/generate";

    const requestData = {
      userInput,
      promptMode,
    };
    const { data } = await axios.post(apiURL, requestData);

    return data.result.content;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // The error is of type AxiosError, so we can access its properties safely
      throw new Error(`An Axios error occurred: ${error}`);
    } else {
      // The error is not of type AxiosError, so we perform a generic error handling
      throw new Error(`An unknown error occurred: ${error}`);
    }
  }
};

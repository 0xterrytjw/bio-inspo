import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { generateBioPrompt } from "../../utils/prompt-helpers";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const userInput = req.body.userInput || "";
  if (userInput.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid input",
      },
    });
    return;
  }
  const promptMode: string = req.body.promptMode;

  try {
    const messages = generateBioPrompt(promptMode, userInput);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.8,
      max_tokens: 200, // ~150 words (200 / 1.33), 1.33 tokens per word - https://platform.openai.com/tokenizer (tool to calculate tokens per word)
    });

    res.status(200).json({ result: completion.data.choices[0].message });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      // The error is of type AxiosError, so we can access its properties safely
      console.error(error.response?.status, error.response?.data);
      res.status(error.response?.status ?? 500).json(
        error.response?.data ?? {
          error: {
            message: "An error occurred during your request.",
          },
        }
      );
    } else {
      // The error is not of type AxiosError, so we perform a generic error handling
      console.error("An unknown error occurred:", error);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

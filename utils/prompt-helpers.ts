import { ChatCompletionMessage } from "./types";

export const generateBioPrompt = (
  vibe: string,
  userInput: string
): ChatCompletionMessage[] => {
  switch (vibe) {
    case "funny":
      return [
        {
          role: "system",
          content:
            "You the funniest person alive. You also happen to be able to come up with the funniest social media biographies.",
        },
        {
          role: "user",
          content: `Please write a funny and cheeky 100 word bio for me based on this: ${userInput}`,
        },
      ];

    case "professional":
      return [
        {
          role: "system",
          content:
            "You a professional writer. You also happen to be able to write the most professional social media biographies.",
        },
        {
          role: "user",
          content: `Please write a professional 100 word bio for me based on this: ${userInput}`,
        },
      ];

    case "sarcastic":
      return [
        {
          role: "system",
          content:
            "You are extremely sarcastic. You also happen to be able to write the most sarcastic social media biographies.",
        },
        {
          role: "user",
          content: `Please write a sarcastic 100 word bio for me based on this: ${userInput}`,
        },
      ];

    default:
      return [
        {
          role: "system",
          content:
            "You are great social media biography writer. But you write stuff that is really sad-sounding and depressing.",
        },
        {
          role: "user",
          content: `Please write a sad and depressing 100 word bio for me based on this: ${userInput}`,
        },
      ];
  }
};

import Head from "next/head";
import { useState, ChangeEvent, FormEvent } from "react";
import Loading from "../components/Loading";
import { generatePrompt } from "../lib/api-helpers";
import Select from "../components/Select";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// for generating bio
const vibe = [
  { id: 1, name: "funny" },
  { id: 2, name: "professional" },
  { id: 3, name: "sarcastic" },
  { id: 4, name: "sad" },
];

export default function Home(): JSX.Element {
  const [selectedPromptMode, setSelectedPromptMode] = useState(vibe[0]);
  const [userInput, setUserInput] = useState<string>("");
  const [result, setResult] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    // api call
    const aiResponse = await generatePrompt(userInput, selectedPromptMode.name);

    setResult(aiResponse);
    setUserInput("");
    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>0xterrytjw intern</title>
      </Head>

      <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center pt-16">
        <h3 className="my-6 text-2xl font-bold text-gray-800 dark:text-white">
          Pick a vibe to generate your social media bio.
        </h3>
        <form onSubmit={handleSubmit} className="flex w-96 flex-col">
          <div className="mb-6 flex justify-center">
            <Select
              data={vibe}
              selected={selectedPromptMode}
              setSelected={setSelectedPromptMode}
            />
          </div>
          <textarea
            className={classNames(
              "outline-green mb-6 rounded border-2 border-green-500 p-3"
            )}
            rows={5}
            name="userInput"
            placeholder="e.g. I'm Sarah, 26 years old, professional ballet dancer, love dogs"
            value={userInput}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setUserInput(e.target.value)
            }
          />
          <button
            className={classNames(
              "btn",
              "bg-green-600 text-white",
              "hover:bg-green-500"
            )}
            type="submit"
            disabled={userInput || loading ? false : true}
          >
            {loading ? <Loading /> : "Generate"}
          </button>
        </form>
        {result && (
          <div className="mt-16 rounded-lg border border-gray-500 p-4 font-bold">
            {result}
          </div>
        )}
      </main>
    </div>
  );
}

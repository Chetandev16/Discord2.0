"use client";

import { Hash } from "lucide-react";

interface Props {
  type: "channel" | "conversation";
  name: string;
}

const ChatWelcome: React.FC<Props> = ({ name, type }) => {
  return (
    <div className="space-y-2 px-2 mb-2">
      {type === "channel" && (
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash className="h-12 w-12 text-white" />
        </div>
      )}

      <p className="text-xl md:text-3xl font-bold">
        {type === "channel" ? "Welcome to #" : ""}
        {name}
      </p>

      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        {type === "channel"
          ? `This is the start of the ${name} channel`
          : `This is the start of your conversation with ${name}`}
      </p>
    </div>
  );
};

export default ChatWelcome;
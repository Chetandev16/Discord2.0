"use client";

import ChatWelcome from "@/components/chat/ChatWelcome";
import { useChatQuery } from "@/store/use-chat-query";
import { Member, Message, Profile } from "@prisma/client";
import { Loader2, ServerCrash } from "lucide-react";

import { Skeleton } from "@/components//ui/skeleton";
import { Fragment, useRef } from "react";

interface Props {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};

const ChatMessages: React.FC<Props> = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const queryKey = `chat:${chatId}`;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({
      queryKey,
      apiUrl,
      paramKey,
      paramValue,
    });

  if (status === "loading") {
    const getLoaderDivs = () => {
      let noOfCellsToRender = 0;

      if (ref.current) {
        noOfCellsToRender = Math.round(ref.current?.clientHeight / 56);
      }

      let divs = [];

      const randomHeightWidth: { [key: number]: string[] } = {
        1: [
          "h-4 lg:h-6 w-[300px] lg:w-[360px]",
          "h-4 lg:h-6 w-[270px] lg:w-[300px]",
        ],
        2: [
          "h-4 lg:h-6 w-[290px] lg:w-[350px]",
          "h-4 lg:h-6 w-[250px] lg:w-[310px]",
        ],
        3: [
          "h-4 lg:h-6 w-[310px] lg:w-[400px]",
          "h-4 lg:h-6 w-[260px] lg:w-[320px]",
        ],
        4: [
          "h-4 lg:h-6 w-[260px] lg:w-[350px]",
          "h-4 lg:h-6 w-[210px] lg:w-[270px]",
        ],
      };

      let top = 20;
      let additionalTopValue = 0;

      for (let i = 0; i < noOfCellsToRender; i++) {
        const index: number = Math.floor(Math.random() * 4) + 1;
        const class1 = randomHeightWidth[index][0];
        const class2 = randomHeightWidth[index][1];
        divs.push(
          <div
            key={i}
            style={{
              top: top + additionalTopValue + "px",
            }}
            className={`space-y-2 absolute left-2
            } flex flex-col items-start`}
          >
            <Skeleton className={`${class1} bg-zinc-200/90 dark:bg-zinc-700`} />
            <Skeleton className={`${class2} bg-zinc-200 dark:bg-zinc-700`} />
          </div>
        );

        top += 20;
        additionalTopValue += 51;
      }

      return divs;
    };

    return (
      <div
        ref={ref}
        className="flex flex-col flex-1 gap-4 p-4 relative overflow-hidden"
      >
        {getLoaderDivs()}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="h-7 w-7 text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong !
        </p>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col py-4 overflow-y-auto">
      <div className="flex-1" />

      <ChatWelcome type={type} name={name} />

      <div className="flex flex-col-reverse mt-auto">
        {data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithMemberWithProfile) => (
              <div key={message.id}>{message.content}</div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;

"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import ActionTooltip from "@/components/ActionTooltip";

interface Props {
  id: string;
  imageUrl: string;
  name: string;
}

const NavigationItem: React.FC<Props> = ({ id, imageUrl, name }) => {
  const parms = useParams();
  const router = useRouter();

  const onClickHandler = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <div>
        <button
          onClick={() => onClickHandler()}
          className="group relative flex items-center"
        >
          <div
            className={cn(
              "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
              parms?.serverId !== id && "group-hover:h-[20px]",
              parms?.serverId === id ? "h-[36px]" : "h-[8px]"
            )}
          />

          <div
            className={cn(
              "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounder-[16px] transition-all overflow-hidden",
              parms?.serverId === id &&
                "bg-primary/10 text-primary rounded-[16px]"
            )}
          >
            <Image fill src={imageUrl} alt="Channel" />
          </div>
        </button>
      </div>
    </ActionTooltip>
  );
};

export default NavigationItem;

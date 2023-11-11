import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavigationSidebar from "@/components/navigation/Navigation-sidebar";
import ServerSidebar from "@/components/server/ServerSidebar";

interface Props {
  serverId: string;
}

const MobileToggle: React.FC<Props> = ({ serverId }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 flex gap-0">
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>

        <ServerSidebar view="mobile" serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileToggle;

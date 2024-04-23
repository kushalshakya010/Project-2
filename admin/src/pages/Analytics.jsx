import {Toaster, toast} from "sonner";
import Loading from "../components/Loading";
import { Select, useMantineColorScheme } from "@mantine/core";
import useStore from "../store";
import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useAnalytics } from "../hooks/post-hook";
import clsx from "clsx";

const Analytics = () => {
  const {colorScheme} = useMantineColorScheme();
  const { user } = useStore();
  const [numOfDays, setNumberOfDays ] = useState(28);
  const [visible, { toggle }] =  useDisclosure(false);
  const {data, isPending, mutate} = useAnalytics(toast, toggle, user?.token);

  const theme = colorScheme === "dark";

  useEffect(() => {
    mutate(numOfDays);
  },[numOfDays]);

  return (
  <div className="w-full">

    <div className="w-full flex items-center justify-between mb-3">
      <p className={clsx("text-xl font-semibold", theme ? "text-white" : " text-slate-700")}>Analytics</p>

      <Select defaultValue="28 days"/>
    </div>
    
    <Loading visible= {isPending} />
    <Toaster richColors />
  </div>
  );
};

export default Analytics;

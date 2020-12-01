import { useEffect, useMemo, useState } from "react";
import { WidgetConfig } from "types/Widget";

import { useLogger } from "./useLogger";

// local type don't export. Move to ../types if export is needed
type Params = {
  config: WidgetConfig;
  id: string; //this is the id of a specific instance of this widget. Used to fetch data
  hasLoadedConfig: boolean;
};

/**
 * This hook retrieves the configuration for the widget that set by the dashboard admin.
 */
export const useConfig = (): Params => {
  const { logger } = useLogger("useData");
  const [config, setData] = useState<WidgetConfig>({} as any);
  const [id, setId] = useState("");

  const hasLoadedConfig = useMemo(() => id !== "" && !!config["client-id"], [id, config]);

  useEffect(() => {
    if (process.browser) {
      setId(window.name);
    }
  }, []);

  /**
   * Data fetching via message event loop.
   *
   * This effect attached a message event listener only for the allowed origin.
   * Asserting that the data is the configuration of this specific widget.
   *
   * To receive this data, this widget will send a message to the parent window with its given ID.
   */
  useEffect(() => {
    if (id !== "" && window.parent) {
      window.addEventListener(
        "message",
        event => {
          if (event.origin !== process.env.NEXT_PUBLIC_DASHBOARD_ORIGIN) return;

          const data = event.data as WidgetConfig;
          logger("DATA CONF", typeof data.conf, data.conf);
          if (typeof data.conf === "string") data.conf = JSON.parse(data.conf as any);

          logger("DATA", data);
          setData(data);
        },
        false
      );

      window.parent.postMessage(id, "*");
    }
  }, [id]);

  return {
    config,
    id,
    hasLoadedConfig
  };
};

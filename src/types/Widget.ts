export interface WidgetConfig {
  "client-id": string;
  conf: WidgetAttributes;
  "data-api": string;
  height: number;
  width: number;
}
export interface WidgetAttributes {
  subReddit: string;
}

export interface WidgetData {
  val: unknown;
}

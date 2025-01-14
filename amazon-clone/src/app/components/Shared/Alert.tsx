import { AlertCircle, CheckCircle } from "lucide-react";

export default function Alert(props: {
  type: string;
  message: string;
  isActive: boolean;
}) {
  //#region Variables

  //#endregion

  //#region Methods

  //#endregion

  //#region Hooks

  //#endregion

  if (!props.isActive) {
    return null;
  }

  return (
    <div
      className={`my-2 flex items-center font-ember ${
        props.type === "error" ? "text-[var(--amazonRed)]" : "text-[var(--amazonGreen)]"
      }`}
    >
      {props.type === "error" && <AlertCircle />}
      {props.type === "success" && <CheckCircle />}
      <div className="ml-2">{props.message}</div>
    </div>
  );
}

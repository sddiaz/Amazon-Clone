import { AlertCircle, CheckCircle } from "lucide-react";

interface AlertProps {
  type: string;
  message: string;
  isActive: boolean;
}
export default function Alert(props: AlertProps) {

  if (!props?.isActive) {
    return null;
  }

  return (
    <div
      className={`my-2 flex items-center font-ember ${
        props?.type === "error" ? "text-[var(--amazonRed)]" : "text-[var(--amazonGreen)]"
      }`}
    >
      {props?.type === "error" && <AlertCircle />}
      {props?.type === "success" && <CheckCircle />}
      <div className="ml-2">{props?.message}</div>
    </div>
  );
}

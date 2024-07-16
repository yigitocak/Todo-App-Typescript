import { Button } from "./Button.tsx";

export const Login = () => {
  return (
    <div className="p-2 flex flex-col items-center gap-2">
      <Button color="#4f7ca8" hover="#375775" text="Log in" />
      <Button color="#4f7ca8" hover="#375775" text="Register" />
    </div>
  );
};

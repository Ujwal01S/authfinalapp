import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";


export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col">
      <h1>Auth</h1>
      <p>A simple authentication service</p>
      <br />
      <LoginButton>
        <Button variant="secondary">Sign in</Button>
      </LoginButton>
    </div>
  );
}

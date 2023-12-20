import SigninForm from "@/components/organisms/SigninForm";
import { useAuthContext } from "@/contexts/AuthContext";
import { useGlobalSpinnerActionsContext } from "@/contexts/GlobalSpinnerContext";

interface SigninFormContainerProps {
  // 로그인했을 때 호출되는 이벤트 핸들러
  onSignin: (error?: Error) => void;
}

const SigninFormContainer = ({ onSignin }: SigninFormContainerProps) => {
  const { signin } = useAuthContext();
  const setGlobalSpinner = useGlobalSpinnerActionsContext();

  const handleSignin = async (username: string, password: string) => {
    try {
      setGlobalSpinner(true);
      await signin(username, password);
      onSignin && onSignin();
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message);
        onSignin && onSignin(err);
      }
    } finally {
      setGlobalSpinner(false);
    }
  };
  return <SigninForm onSignin={handleSignin}></SigninForm>;
};

export default SigninFormContainer;

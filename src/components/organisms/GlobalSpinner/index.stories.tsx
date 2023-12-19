import { Meta } from "@storybook/react";
import GlobalSpinner from ".";
import GlobalSpinnerContextProvider, {
  useGlobalSpinnerActionsContext,
} from "@/contexts/GlobalSpinnerContext";
import Button from "@/components/atoms/Button";

export default {
  title: "organisms/GlobalSpinner",
} as Meta<typeof GlobalSpinner>;

export const WithContextProvider = () => {
  const ChildComponent = () => {
    const setGlobalSpinner = useGlobalSpinnerActionsContext();
    const handleClick = () => {
      setGlobalSpinner(true);
      // 5초후에 닫기
      setTimeout(() => {
        setGlobalSpinner(false);
      }, 5000);
    };

    return (
      <>
        <GlobalSpinner></GlobalSpinner>
        <Button onClick={handleClick}></Button>
      </>
    );
  };

  return (
    <GlobalSpinnerContextProvider>
      <ChildComponent></ChildComponent>
    </GlobalSpinnerContextProvider>
  );
};

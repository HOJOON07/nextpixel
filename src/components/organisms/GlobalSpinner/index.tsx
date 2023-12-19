import Spinner from "@/components/atoms/Spinner";
import { useGlobalSpinnerContext } from "@/contexts/GlobalSpinnerContext";
import styled from "styled-components";

const GlobalSpinnerWrapper = styled.div`
  position: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
`;

const GlobalSpinner = () => {
  // const data = useContext(GlobalSpinnerContext)이거랑 같은 말이구나.
  const isGlobalSpinnerOn = useGlobalSpinnerContext();

  return (
    <>
      {isGlobalSpinnerOn && (
        <GlobalSpinnerWrapper>
          <Spinner isAutoCentering={true}></Spinner>
        </GlobalSpinnerWrapper>
      )}
    </>
  );
};

export default GlobalSpinner;

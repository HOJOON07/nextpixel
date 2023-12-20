import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Text from "@/components/atoms/Text";
import Box from "@/components/layout/Box";
import { useForm } from "react-hook-form";

export type SigninFormData = {
  username: string;
  password: string;
};

interface SigninFormProps {
  onSignin?: (username: string, password: string) => void;
}

const SigninForm = ({ onSignin }: SigninFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>();

  const onSubmit = (data: SigninFormData) => {
    const { username, password } = data;

    onSignin && onSignin(username, password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 사용자 이름 */}
      <Box marginBottom={1}>
        <Input
          {...register("username", { required: true })}
          name="username"
          type="text"
          placeholder="사용자명"
          hasError={!!errors.username}
        ></Input>
        {errors.username && (
          <Text color="danger" variant="small" paddingLeft={1}>
            사용자명은 필수입니다.
          </Text>
        )}
      </Box>
      {/* 비밀번호 */}
      <Box marginBottom={2}>
        <Input
          {...register("password", { required: true })}
          name="password"
          type="password"
          placeholder="비밀번호"
          hasError={!!errors.password}
        ></Input>
        {errors.password && (
          <Text color="danger" variant="small" paddingLeft={1}>
            비밀번호는 필수입니다.
          </Text>
        )}
      </Box>
      <Button width="100%" type="submit">
        로그인
      </Button>
    </form>
  );
};
export default SigninForm;

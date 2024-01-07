import { Button, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-5">
        <Button leftIcon={<FcGoogle />}>Continue with Google</Button>
        <Button colorScheme="facebook" leftIcon={<FaFacebook />}>
          Continue with Facebook
        </Button>
      </div>
      <div>
        <Text>OR</Text>
      </div>
      <div className="flex flex-col">
        <Button>Sign Up</Button>
        <Button>Sign In</Button>
      </div>
    </div>
  );
}

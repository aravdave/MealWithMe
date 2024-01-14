"use client";
import { Button, ButtonGroup, Input, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { userAuthSchema } from "@/lib/userAuthSchema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { error } from "console";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
type FormData = z.infer<typeof userAuthSchema>;

export default function SignIn({ ...props }: UserAuthFormProps) {
  const [isEmailLoading, setEmailLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setGoogleLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  async function onSubmit(data: FormData) {
    setEmailLoading(true);

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      callbackUrl: "/dashboard",
      redirect: false,
    });

    console.log(signInResult);

    setEmailLoading(false);

    if (!signInResult?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    });
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <Button
          leftIcon={<FcGoogle />}
          onClick={() => {
            setGoogleLoading(true);
            signIn("google", { callbackUrl: "/dashboard" });
          }}
          isLoading={isGoogleLoading}
        >
          Continue with Google
        </Button>
      </div>
      <div className="my-2">
        <Text className="text-xl subpixel-antialiased font-medium text-center text-slate-500">OR</Text>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input id="email" placeholder="name@example.com" type="email" isDisabled={isEmailLoading || isGoogleLoading} {...register("email")} />
        {errors?.email && <p className="px-1 text-xs text-red-600">{errors.email.message}</p>}
        <div className="flex flex-col justify-between mt-3">
          <Button type="submit" isLoading={isEmailLoading} colorScheme="linkedin">
            Continue with Email
          </Button>
        </div>
      </form>
    </div>
  );
}

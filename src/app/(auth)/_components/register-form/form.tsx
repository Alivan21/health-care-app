"use client";

import FormProvider from "@/components/hook-form-provider";
import CustomFormInput from "@/components/input/custom-form-input";
import { Button } from "@/components/ui/button";
import { UserRegisterSchema, UserRegisterSchemaType } from "@/schema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type RegisterFormProps = {
  step: number;
  setStep: (value: number) => void;
};

export default function UserRegistrationForm({ step, setStep }: RegisterFormProps) {
  const [isDisabled, setIsDisabled] = useState(true);
  const methods = useForm<UserRegisterSchemaType>({
    resolver: zodResolver(UserRegisterSchema),
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      password: "",
      confirm_password: "",
    },
  });

  const {
    formState: { errors },
    watch,
  } = methods;

  const {username, email, last_name, first_name, confirm_password, password, phone_number} = watch()

  const onSubmit = (data: UserRegisterSchemaType) => {
    console.log("Form Submitted:", data);
    setStep(step + 1);
    console.log(step);
  };

  useEffect(() => {
    if (username !== "" && email !== "" && last_name !== "" && first_name !== "" && confirm_password !== "" && password !== "" && phone_number !== "") {
      setIsDisabled(false);
    }
  }, [confirm_password, email, first_name, last_name, password, phone_number, username])

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <CustomFormInput
            error={errors.first_name?.message}
            label="First Name"
            name="first_name"
            placeholder="First Name"
          />
          <CustomFormInput
            error={errors.last_name?.message}
            label="Last Name"
            name="last_name"
            placeholder="Last Name"
          />
        </div>
        <CustomFormInput
          error={errors.username?.message}
          label="Username"
          name="username"
          placeholder="Username"
        />
        <CustomFormInput
          error={errors.email?.message}
          label="Email"
          name="email"
          placeholder="Email"
        />
        <CustomFormInput
          error={errors.phone_number?.message}
          label="Phone Number"
          name="phone_number"
          placeholder="Phone Number"
        />
        <CustomFormInput
          error={errors.password?.message}
          label="Password"
          name="password"
          placeholder="Password"
          type="password"
        />
        <CustomFormInput
          error={errors.confirm_password?.message}
          label="Confirm Password"
          name="confirm_password"
          placeholder="Confirm Password"
          type="password"
        />
      </div>

      <Button
        className="mt-6 w-full bg-[#1569EF] !font-normal !text-white hover:bg-gray-300 disabled:bg-gray-300"
        disabled={isDisabled} 
        type="submit"
      >
        Sign Up
      </Button>

      <div className="mt-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">or sign up with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button
            className="flex items-center justify-center gap-2 text-base !text-[#606060]"
            type="button"
            variant="outline"
          >
            <Image alt="Google Icon" height={24} src="/img/icons-google.svg" width={24} />
            Google
          </Button>
          <Button
            className="flex items-center justify-center gap-2 text-base !text-[#606060]"
            type="button"
            variant="outline"
          >
            <Image alt="Facebook Icon" height={24} src="/img/icons-facebook.svg" width={24} />
            Facebook
          </Button>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link className="text-blue-500 hover:underline" href="/login">
          Sign in
        </Link>
      </p>
    </FormProvider>
  );
}

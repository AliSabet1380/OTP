"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { schema, type SignUpFormData } from "@/features/auth/sign-up/schema";

interface SignUpFormProps {
  onSubmit: (data: SignUpFormData) => void;
  disabled?: boolean;
  defaultValues?: SignUpFormData;
}

export const SignUpForm = ({
  onSubmit,
  disabled,
  defaultValues = { email: "", password: "", username: "" },
}: SignUpFormProps) => {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center space-y-6"
      >
        <div className="w-full space-y-1">
          <h2 className="self-start text-2xl font-medium">Sign up</h2>
          <p className="text-sm text-gray-700 italic">Create an account</p>
        </div>
        <div className="w-full flex flex-col items-center space-y-3">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    disabled={disabled}
                    {...field}
                    placeholder="Username"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    disabled={disabled}
                    {...field}
                    placeholder="Email"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    disabled={disabled}
                    {...field}
                    placeholder="Password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={disabled} type="submit" className="w-full">
          Continue
        </Button>

        <div className="w-full flex items-center justify-between">
          <Separator className="w-1/3 bg-black" />
          <span>Or</span>
          <Separator className="w-1/3 bg-black" />
        </div>

        <Button
          type="button"
          disabled={disabled}
          variant={"outline"}
          className="w-full"
        >
          Continue With Github
        </Button>

        <div className="w-full flex flex-col items-center space-y-2">
          <span className="text-xs">
            Already have an account ?{" "}
            <Link className="text-blue-700 underline" href={"/sign-in"}>
              Sign in
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
};

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function SignUpForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.username,
      callbackURL: "/",
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("success!");
    }
  }
  async function handelSignUpGoogle() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/",
    });
  }

  return (
    <div className="w-[80%] md:w-[55%] lg:w-[40%] border border-pink-200 p-5 bg-white rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>
               
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="enter password"
                    {...field}
                  />
                </FormControl>
            
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <span
              className="text-green-600 cursor-pointer"
              onClick={() => router.push("/signin")}
            >
              Sign In
            </span>
          </div>
          <div className="w-[60%] flex justify-center items-center mx-auto flex-col gap-2">
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
      <div className="w-full flex justify-center mt-4">
        <Button onClick={handelSignUpGoogle} className="w-[60%]" type="button">
        <FcGoogle /> Start With Google
      </Button>
      </div>
    </div>
  );
}

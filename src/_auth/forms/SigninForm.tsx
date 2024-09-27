import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { SigninValidation } from "@/lib/validation/AuthValidations";
import { useSignIn } from "@/lib/react-query/queries";
import { useEffect } from "react";
import { updatePageTitle } from "@/lib/utils";
import toast from "react-hot-toast";
import { toastConfig } from "@/constants";
import { Icons } from "@/components/ui/icons";

const SigninForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync: signIn, isPending: isSigningIn } = useSignIn();

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
    
    const response = await signIn(user);
    
    if (response?.errors) {
      toast.error(response.errors[0].detail, toastConfig);
      
      return;
    }

    navigate("/panel/dashboard");

  };

  useEffect(() => {
    updatePageTitle(location); 
  }, [location.pathname]);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>Welcome back! Please enter your details.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignin)}
            className="flex flex-col gap-5 w-full mt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Email</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field}  />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field}/>
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSigningIn} size="lg" className="shad-button">
              {isSigningIn && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>

          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <Link to="/forgot-password" className="shad-link">
          I forgot my password
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SigninForm;

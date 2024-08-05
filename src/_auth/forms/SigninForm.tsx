import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/shared/Loader";

import { SigninValidation } from "@/lib/validation/AuthValidations";
import { useSignIn } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {

  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser } = useUserContext();

  // Query
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
      toast({ title: response.errors[0].detail });
      
      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();

      navigate("/admin/dashboard");
    }

  };

  return (
    <Form {...form}>
      <div>
        <p className="flex justify-center items-center text-light-4 small-medium md:base-regular my-10">
          Welcome back! Please enter your details.
        </p>
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
                <FormMessage />
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
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSigningIn} className="shad-button_primary">
            {isSigningIn ? (
              <div className="flex flex-center gap-2">
                <Loader />
              </div>
            ) : (
              "Log in"
            )}
          </Button>

          <p className="text-small-regular text-light-4 text-center mt-2">
            <Link
              to="/forgot-password"
              className="text-primary-500 text-small-semibold ml-1">
              Forgot Password
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;

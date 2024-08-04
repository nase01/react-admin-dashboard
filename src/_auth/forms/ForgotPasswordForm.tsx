import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/shared/Loader";
import { ForgotPWValidation } from "@/lib/validation";

import { useSendPWResetToken } from "@/lib/react-query/queries";
import { useState } from "react";

const ForgotPasswordForm = () => {
	const { toast } = useToast();
	const navigate = useNavigate();
  const [hasResetToken] = useState(false);

  const validationSchema = ForgotPWValidation(hasResetToken);

	const { mutateAsync: sendResetToken, isPending: isSendingPWResetToken } = useSendPWResetToken();

	const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: "",
    },
  });

	const handleSendResetToken = async (user: z.infer<typeof validationSchema>) => {
    
    const response = await sendResetToken(user);
		
    if (response?.errors) {
      toast({ title: response.errors[0].detail });
      
      return;
    }

		toast({ title: `Password reset token sent to this email ${user.email}` });

  };

	const navigateToPasswordReset = () => {
		navigate("/password-reset");
	};
	
  return (
		<Form {...form}>
			<>
				<div className="flex justify-center items-center text-light-4 my-10" >
					<h2 className="font-bold text-lg">
						Password Reset
					</h2>
				</div>
				
				<form
          onSubmit={form.handleSubmit(handleSendResetToken)}
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
					<Button type="submit" disabled={isSendingPWResetToken} className="shad-button_primary">
            {isSendingPWResetToken ? (
              <div className="flex flex-center gap-2">
                <Loader />
              </div>
            ) : (
              "Request A Reset Token"
            )}
          </Button>

					<Button type="button" onClick={navigateToPasswordReset} variant="secondary" disabled={isSendingPWResetToken} className="shad-button_primary">
						I Have A Request Token
					</Button>

          <p className="text-small-regular text-light-4 text-center mt-2">
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1">
              Back to login
            </Link>
          </p>
				</form>
			</>
		</Form>
  )
}

export default ForgotPasswordForm
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { UserValidation } from "@/lib/validation/UserValidations";
import { useAccountUpdate, useCreateUser, useEditUser } from "@/lib/react-query/queries";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { UserFormProps } from "@/types";
import toast from "react-hot-toast";
import { toastConfig } from "@/constants";
import { Icons } from "@/components/ui/icons";
import { useMobileMenuToggle } from "@/components/ToggleProvider";

const UserForm: React.FC<UserFormProps> = ({ userId, userData, userAction = "user-create" }) => {
  const navigate = useNavigate();
  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
  const { mutateAsync: editUser, isPending: isUpdatingUser } = useEditUser();
  const { mutateAsync: accountUpdate, isPending: isUpdatingAccount } = useAccountUpdate();
  const { setModalIsOpen, setModalIsLoading } = useMobileMenuToggle();
  
  const isProcessing = isCreatingUser || isUpdatingUser || isUpdatingAccount;
  setModalIsLoading(isProcessing);
  
  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: userData ? {
      name: userData.name,
      email: userData.email,
      ipWhitelist: userData.ipWhitelist?.join("\n") || "",
      role: userData.role as "admin" | "super", 
      active: userData.active,
      pwForceChange: userData.pwForceChange
    }
    : {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      ipWhitelist: "",
      role: "admin",
      active: true,
      pwForceChange: true
    } 
  });

  const handleSubmitAction = async (formData: z.infer<typeof UserValidation>) => {
    
    const response = userAction === "account-edit"
    ? await accountUpdate(formData) : userId 
    ? await editUser({ id: userId, user: formData })
    : await createUser(formData);

    if (response?.errors) {
      toast.error(response.errors[0].detail, toastConfig);
      return;
    }

    const successMessage = userAction === "account-edit"
    ? "Account successfully updated" : userId
    ? "User successfully updated"
    : "User successfully created";

    toast.success(successMessage, toastConfig);
    setModalIsOpen(false);
    setModalIsLoading(false);
    
    userAction !== "account-edit" && navigate("/panel/users");

  };

  const handleCancel = () => {
    navigate('/panel/users');
  }

  const handleClose = () => {
    setModalIsOpen(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitAction)}
        className="flex flex-col gap-5 w-full mt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">* Name:</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">* Email:</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />


        {userAction === "user-create" && (
          <>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">* Password:</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage className="shad-form_message"  />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">* Confirm Password:</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage className="shad-form_message"  />
                </FormItem>
              )}
            />
          </>
        )}

        {userAction !== "account-edit"  && (
          <div className="flex justify-center items-center gap-6">
            <FormField
              control={form.control}
              name="pwForceChange"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0.5">
                  <FormControl>
                    <Checkbox className="shad-checkbox" checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="ml-2 mb-1 shad-form_label">PW Force Change</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-2 space-y-0.5">
                  <FormControl>
                    <Checkbox className="shad-checkbox" checked={field.value} onCheckedChange={field.onChange}   />
                  </FormControl>
                  <FormLabel className="ml-2 mb-1 shad-form_label">Active</FormLabel>
                </FormItem>
              )}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="ipWhitelist"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">IP White List:</FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""
                  className="shad-textarea"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        {userAction !== "account-edit"  && (
          <div className="max-w-[50%]">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">* Role:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} >
                    <FormControl>
                      <SelectTrigger  className="shad-select" >
                        <SelectValue placeholder="Choose..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="shad-select">
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super">Super</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />
          </div>
        )}
        
        <div className={`flex ${userAction !== "account-edit" ? 'justify-between' : 'justify-end'} items-center my-5`}>
          {userAction === "user-edit" && (
            <Button type="button" onClick={handleCancel} disabled={isProcessing} size="lg" variant="outline">Cancel</Button>
          )}

          {userAction === "user-create" && (
            <Button type="button" onClick={handleClose} disabled={isProcessing} size="lg" variant="outline">Close</Button>
          )}

          <Button disabled={isProcessing} size="lg" className="shad-button mt-3">
            { isProcessing && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> }
            { !userData && !userId ? "Create" : "Update" }
          </Button>
        </div>

      </form>
    </Form>
  )
}

export default UserForm

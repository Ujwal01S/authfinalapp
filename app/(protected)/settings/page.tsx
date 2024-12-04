"use client"

import React, { useState, useTransition } from "react";
// import { auth } from "@/auth";
// import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
// import { Session } from "next-auth";
import { useSession } from "next-auth/react";
// import { logOut } from "@/actions/logout";
import { useCurrenUser } from "@/hooks/use-current-user";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { settings } from "@/actions/settings";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {useForm} from 'react-hook-form'
import { Input } from "@/components/ui/input";
import { SettingsSchema } from "@/schemas";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/ui/form-success";
// const SettingsPage = async () => {
//   const session = await auth();

//   // session.user.image
//   return (
//     <div>
//       <div>{JSON.stringify(session)}</div>
//       <form
//         action={async () => {
//           "use server";
//           await signOut();
//         }}
//       >
//         <Button>Sign Out</Button>
//       </form>
//     </div>
//   );
// };

// export default SettingsPage;

// making client component we need to add session provider

const SettingsPage = () => {
  // const user = useCurrenUser();
  // below function provides mixture of server and client component we can do purely client to by importing signout from next-auth
  // const onClick = () => {
  //   logOut();
  // }
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const {update} = useSession();
  const [isPending, startTransition] = useTransition();
  const user = useCurrenUser();

  const onSubmit = (values:z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values).then((data) => {
        if(data.error){
          setError(data.error)
        }
        if(data.success) {
          update();
          setSuccess(data.success);
        }
      }).catch(() => setError("Something went wrong")) 
    })
  }

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver:zodResolver(SettingsSchema),
    defaultValues:{
      name:user?.name || undefined,
    }
  });

  // write undefined so we won't even update database 

  return ( 
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          ⚙️Settings
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                      {...field}
                      placeholder="Re-writename"
                      disabled = {isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type="submit">Save</Button>
            </form>
        </Form>
      </CardContent>
    </Card>
   );
}
 
export default SettingsPage;
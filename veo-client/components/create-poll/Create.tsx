"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PollValidator } from "@/lib/validators/PollValidator";
import { LuCirclePlus } from "react-icons/lu";

const Create = () => {
  const form = useForm<z.infer<typeof PollValidator>>({
    resolver: zodResolver(PollValidator),
    defaultValues: {
      title: "",
      options: [
        {
          id: uuid(),
          name: "",
        },

        {
          id: uuid(),
          name: "",
        },
        {
          id: uuid(),
          name: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "options",
    control: form.control,
  });
  function onSubmit(values: z.infer<typeof PollValidator>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full min-h-screen space-y-8 flex flex-col">
        <FormField
        
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Vote for me" className="w-full h-12" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2 justify-center">
        {fields.map((f, index) => (
          <FormField
            key={f.id}
            control={form.control}
            name={`options.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option {index + 1}</FormLabel>
                <FormControl>
                  <Input  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        </div>

        <Button onClick={() => append({ id: uuid(), name: "" })}>
         <LuCirclePlus className="size-10"/>
        </Button>
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};

export default Create;

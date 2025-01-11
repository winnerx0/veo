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
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

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

  const { mutate, isPending } = useMutation({
    mutationKey: ["poll"],
    mutationFn: async (body: PollValidator) => {
      const res = await axios.post(
        "https://veo-v54e.onrender.com/api/v1/pjoll/create",
        body,
        {
          withCredentials: true,
        }
      );
      const ans = res.data;
      console.log(ans);
    },
    onError(error) {
      console.log(error);
      toast(error.message);
    },
  });

  async function onSubmit(values: z.infer<typeof PollValidator>) {
    await mutate(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-8 flex flex-col"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Vote for me"
                  className="w-full h-12"
                  {...field}
                />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button
          type="button"
          onClick={() => append({ id: uuid(), name: "" })}
          disabled={fields.length === 5 || isPending}
        >
          <LuCirclePlus className="size-10" />
        </Button>
        <Button type="submit" disabled={isPending}>
          Create
        </Button>
      </form>
    </Form>
  );
};

export default Create;

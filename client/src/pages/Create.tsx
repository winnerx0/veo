import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { LuCirclePlus } from "react-icons/lu";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { BACKEND_URL } from "../../lib";
import { PollValidator } from "../../lib/validators/PollValidator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

const Create = () => {
  const [date, setDate] = useState<string>(new Date().toISOString());

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

  const { fields, append } = useFieldArray({
    name: "options",
    control: form.control,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["poll"],
    mutationFn: async (body: PollValidator) => {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/polls/create`,
        { ...body, ending: date },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      const ans = res.data;
      console.log(ans)
    },
    onSuccess() {
      toast("Poll Created");
    },
    onError(error) {
      if (error instanceof AxiosError) {
        toast(JSON.stringify(Object.values(error?.response?.data)));
      }
    },
  });

  function onSubmit(values: z.infer<typeof PollValidator>) {
    mutate(values);
  }
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 space-y-4">
      <h1 className="text-3xl font-bold"> Create Poll</h1>
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

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
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
    </div>
  );
};

export default Create;

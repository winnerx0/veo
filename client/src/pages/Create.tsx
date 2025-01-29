import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { LuCirclePlus, LuCircleX } from "react-icons/lu";
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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Create = () => {
  const [date, setDate] = useState<Date| undefined>(new Date());

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
      console.log(ans);
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
                      <div className="relative">
                        <Input {...field} />
                        <LuCircleX
                          className="absolute right-4 top-2.5 z-20"
                          onClick={() => remove(index)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button
            type="button"
            className="rounded-full"
            onClick={() => append({ id: uuid(), name: "" })}
            disabled={fields.length === 5 || isPending}
          >
            <LuCirclePlus className="size-10" />
          </Button>
          <Button type="submit" disabled={isPending} className="rounded-full">
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Create;

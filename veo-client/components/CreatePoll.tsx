"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { v4 as uuidv4, UUIDTypes } from 'uuid';
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

type Option = {
    id: UUIDTypes
  name: string;
};

const CreatePoll = () => {
  const [title, setTitle] = useState<string>("");

  const [options, setOptions] = useState<Option[]>([
    {
        id: uuidv4(),
      name: "",
    },
  ]);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleOptions = (id: UUIDTypes, e: ChangeEvent<HTMLInputElement>) => {
    setOptions((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, name: e.target.value } : option
      )
    );
  };
  

  const handlePoll = async () => {
    try {
        const res = await axios.post('http://localhost:8080/api/v1/poll/create',  {title, options}, {
            headers: {
                "Accept": "application.json",
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        const ans = res.data
        console.log(ans)
    } catch (error) {
        console.log(error)
    }
  }

  const { mutate, isPending } = useMutation({
    mutationFn: handlePoll, mutationKey: ["poll"]
  })
  return (
    <div className="flex flex-col py-4 w-full">
       <section className="flex items-center justify-between gap-4">
      <h1 className="font-bold text-3xl">Create Poll</h1>
          <Button onClick={() => mutate()} disabled={isPending}> Create</Button>
         </section>
      <div className="flex flex-col gap-10">
       <div >
          <Label>Title</Label>
          <Input
            placeholder="Vote For The 2025 President"
            value={title}
            onChange={handleTitle}
          />
        </div>
      <section className="flex flex-col gap-4">
      {
            options.map((option, index) => (
                <div key={index}>
                <Label>Option {index + 1}</Label>
                <Input name="option" value={option.name} onChange={(e) => handleOptions(option.id, e)} />
       
              </div>
            ))
        }
      </section>
        <Button onClick={() => setOptions(prev => ([...prev, {id: uuidv4(), name: ""}]))} disabled={options.length === 3 || isPending}>Add Optios</Button>
      </div>
    </div>
  );
};

export default CreatePoll;

"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";

enum FlexibilityEnum {
  none = "none",
  min15 = "15 min",
  min30 = "30 min",
  min45 = "45 min",
  hr1 = "1 hr",
  hr2 = "2 hr",
}

enum RelativeFlexibilityEnum {
  before = "before",
  after = "after",
  both = "both",
  undefined = "undefined",
}

enum DurationEnum {
  min15 = "15 min",
  min30 = "30 min",
  min45 = "45 min",
  hr1 = "1 hr",
}

interface AvailabilityFormInput {
  time: any;
  flexibility: FlexibilityEnum;
  relativeFlexibility?: RelativeFlexibilityEnum;
  duration: DurationEnum;
}

export function Availability() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Status</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit status</DialogTitle>
            <DialogDescription>Make changes to your status here. Click save when you&apos;re done.</DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Status</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit status</DrawerTitle>
          <DrawerDescription>Make changes to your status here. Click save when you&apos;re done.</DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const { register, handleSubmit, watch } = useForm<AvailabilityFormInput>();
  const flexibility = watch("flexibility");
  let showWhenFlexible = flexibility !== ("None" as FlexibilityEnum) && flexibility !== undefined;
  console.log("flexibility");

  async function onSubmit(data: AvailabilityFormInput) {
    data.relativeFlexibility = data.flexibility === ("None" as FlexibilityEnum) ? undefined : data.relativeFlexibility;
    const response = await fetch(`/api/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: data.time,
        flexibility: data.flexibility,
        relativeFlexibility: data.relativeFlexibility,
        duration: data.duration,
      }),
    });

    if (!response?.ok) {
      console.log("Something went wrong");
    }
  }

  return (
    <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <Label htmlFor="time">When are you eating?</Label>
        <Input required type="time" {...register("time", { required: true })} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="flexibility">How flexible are you?</Label>
        <select {...register("flexibility")}>
          <option selected value="None">
            None
          </option>
          <option value="15 min">15 min</option>
          <option value="30 min">30 min</option>
          <option value="45 min">45 min</option>
          <option value="1 hr">1 hr</option>
          <option value="2 hr">2 hr</option>
        </select>
      </div>
      {showWhenFlexible && (
        <div className="grid gap-2">
          <Label htmlFor="relativeFlexibility">{flexibility} before or after?</Label>
          <select {...register("relativeFlexibility")}>
            <option value="Before">Before</option>
            <option selected value="After">
              After
            </option>
            <option value="Both">Both</option>
          </select>
        </div>
      )}
      <div className="grid gap-2">
        <Label htmlFor="duration">How long?</Label>
        <select {...register("duration")}>
          <option value="15 min">15 min</option>
          <option value="30 min">30 min</option>
          <option value="45 min">45 min</option>
          <option value="1 hr">1 hr</option>
        </select>
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}

"use server";

import { saveMeal } from "./meals";
import { redirect } from "next/navigation";

function isInvalid(text) {
  return text?.trim() === "";
}

export async function shareMeal(formData) {
  const meal = {
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
  };

  // basic validation
  if (
    isInvalid(meal.title) ||
    isInvalid(meal.summary) ||
    isInvalid(meal.instructions) ||
    isInvalid(meal.creator) ||
    isInvalid(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    throw new Error("Invalid inputs");
  }

  await saveMeal(meal);
  redirect("/meals");
}

// lib/recommendations.ts

// FIX: Use curly braces { Stack } because it is a named export, not a default export
import { Stack } from "../contentstack-sdk"; 

export const getRecommendations = async (vibe: "Adventure" | "Relaxation" | "Luxury") => {
  
  // DIRECTLY use 'Stack' here. We don't need 'Contentstack.Stack'
  const query = Stack.ContentType("activity").Query();

  if (vibe === "Adventure") {
    // Logic: Category is Trekking OR Water Sports
    // We create new query instances inside the .or() function
    query.or(
      Stack.ContentType("activity").Query().where("category", "Trekking"),
      Stack.ContentType("activity").Query().where("category", "Water Sports")
    );
  } else if (vibe === "Relaxation") {
    query.where("category", "Camping");
  } else if (vibe === "Luxury") {
    query.where("category", "Luxury");
  }

  // Fetch data
  const result = await query
    .includeReference(["destination"])
    .toJSON()
    .find();

  // Contentstack returns [entries, count], we just want the entries array (index 0)
  return result[0]; 
};
import { NextResponse } from "next/server";
import { fetchNavNodesSafe, fetchProductsPageSafe, parseProductsQuery } from "@/lib/products-filter";

export const dynamic = "force-dynamic";

/**
 * Filtered catalogue query for the client-side grid in ProductsShop.
 * Mirrors the SSR /products page logic exactly; returns card payloads with
 * geo-aware display prices pre-computed server-side.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = parseProductsQuery(searchParams);
  const navNodes = await fetchNavNodesSafe();
  const result = await fetchProductsPageSafe(query, navNodes);
  // Always 200 with a well-formed payload so the client grid renders an empty
  // state instead of throwing on an unexpected error shape.
  return NextResponse.json(result);
}

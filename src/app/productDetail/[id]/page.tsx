import React from "react";
import ProductDetail from "@/components/content/productDetail/ProductDetail";
import { Metadata } from "next";
import { headers } from "next/headers";

import { cache } from "react";

export const getItem = cache(async (id: any) => {
  const data = await fetch(
    `https://asia-south1-qwiklyfluttertest.cloudfunctions.net/itemApis-app/item-detail?itemId=${id}`
  );
  let product = await data.json();
  return product;
});

export async function generateMetadata({
  params: { id },
}: any): Promise<Metadata> {
  // read route params
  const headersList = headers();
  const fullUrl = headersList.get("referer") || "";
  /**
   * below code is commented becouse now getting data from getItem
   */

  // fetch data
  // const data = await fetch(
  //   `https://asia-south1-qwiklyfluttertest.cloudfunctions.net/itemApis-app/item-detail?itemId=${id}`
  // )
  let product = await getItem(id);
  return {
    title: product?.name,
    description: product?.description,
    applicationName: "Next.js",
    keywords: ["qwiklyfluttertest.web.app/", "findBetter", product?.name],
    alternates: {
      canonical: fullUrl,
      languages: {
        "en-US": "/en-US",
        "de-DE": "/de-DE",
      },
    },
    openGraph: {
      title: product?.name,
      description: "The React Framework for the Web",
      url: fullUrl,
      siteName: "Find Better",
      images: [product?.itemVariants?.[0]?.media?.[0]?.url],
      locale: "en_US",
      type: "website",
    },

    // icons: {
    //   icon: product?.itemVariants?.[0]?.media?.[0]?.url
    // },
  };
}
const ProductDetailPage = async ({ params: { id } }: any) => {
  let product = await getItem(id);

  return (
    <main>
      <div>
        <ProductDetail product={product} />
      </div>
    </main>
  );
};

export default ProductDetailPage;

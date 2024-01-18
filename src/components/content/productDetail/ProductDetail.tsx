"use client";
import React, { useEffect, useState } from "react";
import variables from "./variables.module.scss";
import SwipeableTextMobileStepper from "./ProductImage";
import ProductContent from "./ProductContent";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import { Metadata } from "next";
import { useLoader } from "@/utils/useLoader";
import { themeColor } from "@/utils/constants";
import Back from "../../../assets/icons8-go-back-24.png";
import Image from "next/image";
import SearchBar from "../productHome/searchBar";

export const metadata: Metadata = {
  title: "Find Better",
  description: "Find Better Proldifvgddbfjhfdduct Nearby",
};

const ProductDetail = (props: any) => {
  const [product, setProduct] = useState<any>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const { showLoader } = useLoader();
  const matches = useMediaQuery("(min-width:600px)");
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    // axios
    //   .get(
    //     `https://asia-south1-qwiklyfluttertest.cloudfunctions.net/itemApis-app/item-detail?itemId=${props.id}`
    //   )
    //   .then((response: any) => {
    //     let data = response?.data;
    //     setProduct(data);
    setProduct(props?.product);
    setLoading(false);
  }, [product, loading]);

  return (
    <>
      {loading && showLoader(loading)}

      <div className={variables.detailPageWrap}>
        {/* <SearchBar /> */}
        <div style={{ background: "#d74c51" }}>
          <div
            style={{
              color: "white",
              marginLeft: "5vw",
              cursor: "pointer",
              padding: "2px",
              fontWeight: "600",
            }}
            onClick={() => router.push("/")}
          >
            {"← Back"}
          </div>
        </div>
        <div className={variables.productWrap}>
          <div className={variables.imageSection} style={{ margin: 15 }}>
            <SwipeableTextMobileStepper product={product} />
          </div>
          <div className={variables.contentSection}>
            <ProductContent product={product} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

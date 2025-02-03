"use client";

import { Divider, IconButton } from "@mui/material";
import { Minus, PlusIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AmazonButton from "../components/Shared/AmazonButton";
import AmazonLink from "../components/Shared/AmazonLink";
import FirebaseService from "../services/FirebaseService";
import HelperFunctions from "../services/Helpers";
import { StoreService } from "../services/StoreService";
import { Product, RootState } from "../types";
import { useRouter } from "next/navigation";

export default function Cart() {
  //#region Variables

  const firebaseUserData = useSelector((state: RootState) => state.user);
  const [cartData, setCartData] = useState<
    { productData: Product; quantity: number }[]
  >([]);
  const router = useRouter();
  const tomorrow = new Date();

  //#endregion

  //#region Methods

  const handleAddToCart = async (id: number) => {
    try {
      const result = await FirebaseService.addItemToCart(
        firebaseUserData?.userData?.uid,
        id.toString(),
        1
      );
    } catch (error) {
      console.error("Error fetching product #" + id + ": ", error);
      throw error;
    }
  };

  const handleRemoveItemFromCart = async (id: number) => {
    try {
      const result = await FirebaseService.removeItemFromCart(
        firebaseUserData?.userData?.uid,
        id.toString()
      );
    } catch (error) {
      throw error;
    }
  };

  const handleFetchCartData = async () => {
    try {
      const result = await StoreService.getCartProducts(
        firebaseUserData?.userData?.cart
      );
      if (result) {
        setCartData(result);
      }
    } catch (error) {
      throw error;
    }
  };

  //#endregion

  //#region Hooks

  useEffect(() => {
    if (firebaseUserData?.userData?.cart) {
      handleFetchCartData();
    }
  }, [firebaseUserData]);

  //#endregion

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-[var(--amazonGrey)] p-4">
      {cartData && (
        <div className="w-full max-w-[1500px] flex flex-col md:flex-row gap-4">
          {/* Checkout Section */}
          {cartData?.length > 0 && (
            <div className="md:w-1/4 w-full bg-white p-4 shadow-md md:self-start order-1 md:order-2">
              <span className="font-bold font-emberThin">
                Total: $
                {cartData?.reduce(
                  (acc, curr) =>
                    acc + curr?.productData?.price * curr?.quantity,
                  0
                )}
              </span>
              <AmazonButton
                full
                text="Proceed to Checkout"
                type="standard"
                onClick={() => {}}
              />
            </div>
          )}
          {/* Cart Items Section */}
          {cartData?.length == 0 && (
            <div className="flex-1 flex justify-between bg-white p-4 shadow-md order-2 md:order-1 select-none">
              <h2 className="text-3xl font-emberThin">
                Your Amazon Cart is empty
              </h2>
              <div>
                <AmazonButton
                  type="standard"
                  text="Continue Shopping"
                  onClick={() => router.push("/")}
                />
              </div>
            </div>
          )}
          {cartData?.length > 0 && (
            <div className="flex-1 bg-white p-4 shadow-md order-2 md:order-1">
              <h2 className="text-3xl font-emberThin mb-4">Shopping Cart</h2>
              <Divider />
              <div className="space-y-4">
                {/* Cart Items */}
                {cartData?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 py-4 border-b border-gray-200"
                  >
                    {/* Left Column - Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <Link
                        href={`/product/${item?.productData?.id}`}
                        className="block w-full h-full relative"
                      >
                        <Image
                          width={100}
                          height={100}
                          src={
                            item?.productData?.images[0] ||
                            "/api/placeholder/96/96"
                          }
                          alt={item?.productData?.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </Link>
                    </div>

                    {/* Middle Column - Description */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium font-ember text-gray-900 truncate">
                        {item?.productData?.title}
                      </h3>
                      <span
                        className={`text-sm font-ember ${
                          item?.productData?.availabilityStatus === "In Stock"
                            ? "text-green-700"
                            : "text-red-600"
                        }`}
                      >
                        {item?.productData?.availabilityStatus === "In Stock"
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>
                      <div className="text-sm font-emberThin flex flex-nowrap items-center whitespace-wrap">
                        <span>
                          Free Delivery{" "}
                          <strong>
                            Tomorrow, {HelperFunctions.formatDate(tomorrow)}
                          </strong>
                        </span>
                      </div>

                      <div className="font-emberThin font-bold text-sm">
                        <AmazonLink
                          text={item?.productData?.returnPolicy}
                          href="https://www.linkedin.com/in/santiagoddiaz"
                        />
                      </div>
                      <div className="w-[100px] flex font-bold text-sm font-ember justify-between items-center font-ember text-sm border-4 rounded-3xl border-[var(--amazonButton)]">
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleRemoveItemFromCart(item?.productData?.id)
                          }
                        >
                          {item?.quantity == 1 ? <Trash2 /> : <Minus />}
                        </IconButton>
                        <div>{item?.quantity}</div>
                        <IconButton
                          size="small"
                          onClick={() => handleAddToCart(item?.productData?.id)}
                        >
                          <PlusIcon />
                        </IconButton>
                      </div>
                    </div>

                    {/* Right Column - Price */}
                    <div className="flex-shrink-0 text-right">
                      <p className="font-ember text-lg font-medium text-gray-900">
                        ${item?.productData?.price?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

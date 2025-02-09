"use client";
import Reviews from "@/app/components/Isolated/Reviews/Reviews";
import AddressDisplay from "@/app/components/Shared/AddressDisplay";
import AmazonButton from "@/app/components/Shared/AmazonButton";
import AmazonLink from "@/app/components/Shared/AmazonLink";
import AmazonRating from "@/app/components/Shared/AmazonRating";
import FirebaseService from "@/app/services/FirebaseService";
import HelperFunctions from "@/app/services/Helpers";
import { StoreService } from "@/app/services/StoreService";
import { ExtraOrderInfo, Product, RootState, UserData } from "@/app/types";
import {
  Alert,
  AlertColor,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { CheckIcon, Clock, MapPin, XIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Prime from "../../../../public/prime-logo.png";

interface ProductPageProps {
  href: string;
}

export default function Page(props: ProductPageProps) {
  
  //#region Variables

  const [alert, setAlert] = useState<string[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const firebaseUserData = useSelector((state: RootState) => state.user);
  const [productInfo, setProductInfo] = useState<Product | null>(null);
  const [orderInfo, setOrderInfo] = useState<ExtraOrderInfo | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const params = useParams();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  //#endregion

  //#region Methods

  const getDiscountedPrice = (price: number) => {
    const discountedDecimal =
      price - price * (Number(productInfo?.discountPercentage) / 100);
    const roundedResult = Math.round(discountedDecimal * 100) / 100;
    return roundedResult.toFixed(2); // Ensure two decimal places
  };

  const handleAlert = (type: string, message: string) => {
    setAlert([type, message]);
    setTimeout(() => {
      setAlert([]);
    }, 3000);
  };

  const handleAddToCart = async () => {
    try {
      const result = await FirebaseService.addItemToCart(
        firebaseUserData?.userData?.uid,
        params.id,
        selectedQuantity
      );
      if (result) {
        handleAlert("success", "Item Added to Cart.");
      } else {
        handleAlert("error", "Failed to Add Items.");
      }
    } catch (error) {
      console.error("Error fetching product #" + params.id + ": ", error);
      throw error;
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const result = await FirebaseService.addItemToWishlist(
        firebaseUserData?.userData?.uid,
        params.id
      );
      if (result) {
        handleAlert("success", "Item Added to Wishlist.");
      } else {
        handleAlert("error", "Item is already in your Wishlist.");
      }
    } catch (error) {
      console.error("Error fetching product #" + params.id + ": ", error);
      throw error;
    }
  };

  const sortReviews = (
    reviews: Product["reviews"] | undefined,
    type: string
  ) => {
    if (!reviews) return [];

    return [...reviews].sort((a, b) => {
      switch (type) {
        case "Lowest Rating":
          return a.rating - b.rating;
        case "Highest Rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "In Stock":
        return "green";
      case "Low Stock":
        return "var(--amazonOrange)";
      case "Out of Stock":
        return "red";
    }
  };

  //#endregion

  //#region Hooks

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        const productInfo = await StoreService.getProductById(params.id);
        const orderInfo = await FirebaseService.getProductOrderInfo(params.id);

        if (productInfo) {
          setProductInfo(productInfo);
          setMainImage(productInfo?.images[0]);
        }
        if (orderInfo) {
          setOrderInfo(orderInfo as ExtraOrderInfo);
        }
      } catch (error) {
        console.error("Error fetching product #" + params.id + ": ", error);
        throw error;
      }
    };

    if (params != undefined && !productInfo && !orderInfo) {
      fetchProductById();
    }
  }, [params]);

  //#endregion

  return (
    <>
      {" "}
      {!productInfo ? (
        ""
      ) : (
        <div className="flex flex-col items-center max-w-[1500px] mx-auto relative h-[200vh]">
          {/* Product Section Container */}
          <div>
            {productInfo && mainImage && (
              <div className="p-10 h-full flex flex-col md:flex-row">
                {/* Images */}
                <div className="drop-shadow-md  max-w-[1000px] md:w-1/2 flex items-center justify-center h-full gap-4">
                  {/* Thumbnails Row */}
                  <div className="flex flex-col gap-2 justify-center">
                    {productInfo?.images?.map((image, index) => (
                      <div
                        key={index}
                        onClick={() => setMainImage(image)}
                        className="cursor-pointer relative w-20 h-20 border border-gray-200 rounded hover:scale-105 transition-transform duration-200"
                      >
                        <Image
                          loading="lazy"
                          alt={`${productInfo?.title} - Thumbnail ${index + 1}`}
                          src={image}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Main Image */}
                  <div className="aspect-square relative w-3/4">
                    <Image
                      loading="lazy"
                      alt={productInfo?.title}
                      src={mainImage}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                {/* Details */}
                <div className="w-full md:w-1/4 p-4">
                  <div className="border-b border-[#00000044]">
                    <div className="text-2xl font-ember">
                      {productInfo?.title}
                    </div>
                    {/* Rating */}
                    <AmazonRating size="small" rating={productInfo?.rating} />
                    {orderInfo && (
                      <span className="mr-1 font-emberThin text-sm">
                        <span className="font-bold">
                          {orderInfo?.recentOrders} bought
                        </span>
                        {" in the past month"}
                      </span>
                    )}{" "}
                  </div>
                  <div className="mt-2 pb-2 border-b border-[#00000044]">
                    <div className="text-xl font-emberThin font-bold">
                      ${getDiscountedPrice(productInfo?.price)}
                    </div>
                    <div className="line-through text-xs font-emberThin font-bold text-[var(--amazonRed)]">
                      ${productInfo?.price}
                    </div>
                    <div className="inline-flex items-center bg-green-50 rounded-lg p-2 gap-3">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold text-green-600">
                          {productInfo?.discountPercentage}%
                        </span>
                        <span className="text-xs text-green-700">OFF</span>
                      </div>
                      <div className="flex flex-col text-sm">
                        <span className="font-semibold text-gray-800">
                          Limited Time Deal
                        </span>
                        <span className="text-gray-600 text-xs flex items-center">
                          <Clock size={12} className="mr-1" />
                          Claim soon
                        </span>
                      </div>
                    </div>
                    {/* Monthly Plan */}
                    {productInfo?.price > 30 && (
                      <div className="text-sm font-emberThin">
                        <mark
                          style={{ backgroundColor: "var(--amazonOrange)" }}
                        >
                          Or{" "}
                          <span className="font-bold">
                            ${Math.round((productInfo?.price / 6) * 100) / 100}
                          </span>
                        </mark>
                        / mo (6 mos).
                      </div>
                    )}
                    <span className="flex text-sm font-emberThin font-bold -ml-4">
                      <Image
                        src={Prime}
                        height={10}
                        width={75}
                        alt="Prime Logo"
                        className="-mr-2"
                      />
                      Two-Day
                    </span>
                    <span className="flex text-sm font-emberThin font-bold items-center">
                      <AmazonLink
                        href="https://www.linkedin.com/in/santiagoddiaz/"
                        text="Free Returns"
                        style="text-xs ml-1 font-bold"
                      />
                    </span>
                    <span className="flex text-sm font-emberThin font-bold items-center">
                      <AmazonLink
                        href="https://www.linkedin.com/in/santiagoddiaz/"
                        text={productInfo?.returnPolicy}
                        style="text-xs ml-1 font-bold"
                      />
                    </span>
                  </div>
                  <span className="flex flex-col text-sm font-emberThin items-start">
                    <span className="ml-2 font-bold">About this Item</span>
                    <ul className="list-disc ml-6">
                      <li>
                        {" "}
                        <span className="font-bold">Description</span>:{" "}
                        {productInfo?.description}
                      </li>
                      <li>
                        <span className="font-bold">Dimensions</span>:{" "}
                        {productInfo?.dimensions?.height} ×{" "}
                        {productInfo?.dimensions?.width} ×{" "}
                        {productInfo?.dimensions?.depth}
                      </li>
                      <li>
                        <span className="font-bold">Weight</span>:{" "}
                        {productInfo?.weight}
                      </li>
                      <li>
                        {" "}
                        <span className="font-bold">
                          Warranty Information
                        </span>: {productInfo?.warrantyInformation}
                      </li>
                    </ul>
                  </span>
                  {/* Tags */}
                  <span className="mt-2 flex font-bold font-emberThin text-sm">
                    <span className="mr-2">Tags: </span>
                    <div className="w-3/4 overflow-x-auto">
                      <div className="flex gap-2 pb-2">
                        {productInfo?.tags?.map((tag) => (
                          <div key={tag} className="flex-shrink-0">
                            <Chip size="small" label={tag} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </span>
                </div>
                {/* Purchase Section */}
                <div className="w-full md:w-1/4 p-4 border rounded space-y-2">
                  <div className="text-xl font-emberThin">
                    ${getDiscountedPrice(productInfo?.price)}
                  </div>

                  <div className="space-y-2">
                    <span className="flex text-sm font-emberThin font-bold -ml-4">
                      <Image
                        src={Prime}
                        height={10}
                        width={75}
                        alt="Prime Logo"
                        className="-mr-2"
                      />
                      Two-Day
                    </span>

                    <span className="flex text-sm font-emberThin font-bold items-center">
                      <AmazonLink
                        href="https://www.linkedin.com/in/santiagoddiaz/"
                        text="Free Returns"
                        style="text-xs font-bold"
                      />
                    </span>
                  </div>

                  <div className="text-sm font-emberThin flex flex-nowrap items-center whitespace-wrap">
                    <span>
                      Free Delivery{" "}
                      <strong>
                        Tomorrow, {HelperFunctions.formatDate(tomorrow)}
                      </strong>
                      . Order Within{" "}
                      <strong className="text-[var(--amazonGreen)]">
                        {HelperFunctions.minutesUntilMidnight()}
                      </strong>
                    </span>
                  </div>

                  <span className="flex text-sm font-emberThin items-center">
                    <MapPin size={14} className="mr-1 -ml-1" />
                    <AddressDisplay
                      userData={firebaseUserData?.userData as UserData}
                    />
                  </span>

                  {productInfo?.stock > 0 ? (
                    <div className="space-y-4">
                      <span
                        className="text-xl font-ember"
                        style={{
                          color: `${getAvailabilityColor(
                            productInfo?.availabilityStatus
                          )}`,
                        }}
                      >
                        {productInfo?.availabilityStatus}
                      </span>

                      <div className="w-full">
                        <FormControl variant="filled" size="small" fullWidth>
                          <InputLabel id="quantity-select-label">
                            Quantity
                          </InputLabel>
                          <Select
                            value={selectedQuantity}
                            label="Quantity"
                            onChange={(e) =>
                              setSelectedQuantity(Number(e.target.value))
                            }
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxHeight: 224,
                                  overflow: "auto",
                                },
                              },
                            }}
                          >
                            {[...Array(productInfo.stock)].map((_, index) => {
                              const value = index + 1;
                              return (
                                <MenuItem key={value} value={value}>
                                  {value}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xl font-bold text-red-600">
                      Out of Stock
                    </span>
                  )}
                  <AmazonButton
                    full
                    text="Add to Cart"
                    type="standard"
                    onClick={handleAddToCart}
                    disabled={productInfo?.availabilityStatus != "In Stock"}
                  />
                  <AmazonButton
                    full
                    text="Add to Wishlist"
                    type="outlined"
                    onClick={handleAddToWishlist}
                  />
                  {alert?.length > 0 && (
                    <Alert
                      icon={
                        alert[0] == "success" ? (
                          <CheckIcon fontSize="inherit" />
                        ) : (
                          <XIcon fontSize="inherit" />
                        )
                      }
                      severity={alert[0] as AlertColor}
                    >
                      {alert[1]}
                    </Alert>
                  )}
                </div>
              </div>
            )}
          </div>
          {/* Frequently Bought Togther */}

          {/* Compare with Similar Items */}

          {/* Reviews */}
          <hr className="w-full" />
          <Reviews productInfo={productInfo} />
        </div>
      )}
    </>
  );
}

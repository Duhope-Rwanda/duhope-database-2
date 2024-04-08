import moment from "moment";
import { shippingAccount } from "../utils/constants"

const apiUrl = "https://apps-sit.aj-ex.com";
const username = process.env.REACT_APP_SHIPPING_USERNAME;
const password = process.env.REACT_APP_SHIPPING_PASSWORD;

export const generateToken = async () => {
  try {
    const response = await fetch(`${apiUrl}/authentication-service/api/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      }),
    });

    const res = await response.json();
    return res
  } catch (error) {
    console.error("Error retrieving data", error);
    return undefined;
  }
}

export const createOrder = async (formData: any) => {
  try {
    if(!formData) {
      return
    }
    const {
      totalValue, 
      names, 
      telephone, 
      email, 
      country, 
      city, 
      province, 
      district, 
      address, 
      postalCode
    } = formData
    const date = new Date()
    const token: any = await generateToken()
    if(!token) {
      return
    }
    
    const generateRandomSixDigitNumber = () => {
      return Math.floor(100000 + Math.random() * 900000);
    }

    const randomNumber = generateRandomSixDigitNumber();
    const response = await fetch(`${apiUrl}/order-management/api/v2/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify({
        orderId: `ord_${randomNumber}`,
        orderTime: moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        productCode: "SE0123",
        expressType: "C93801",
        totalDeclaredValue: totalValue,
        declaredCurrency: "SAR",
        parcelTotalWeight: 9.071,
        parcelTotalVolume: 1,
        pickupMethod: "PICKUP",
        paymentMethod: "SENDER_INSTALLMENT",
        customerAccount: shippingAccount,
        buyerName: names,
        senderInfo: {
          name: "duhope",
          phone: "0553397254",
          email: "eddykayiganwa@gmail.com",
          contactType: "ENTERPRISE",
          addressType: "LOOKUP",
          country: "Saudi Arabia",
          countryCode: "SA",
          province: "Riyadh Province",
          city: "Riyadh",
          cityCode: "RUH",
          district: "Al Olaya",
          detailedAddress: "King Fahd Road, King Fahd Library",
          postalCode: "5678"
      },
        receiverInfo: {
          name: names,
          phone: telephone,
          email,
          contactType: "INDIVIDUAL",
          addressType: "FREE_TEXT",
          country: country,
          countryCode: "SA",
          province: province || null,
          city: city,
          cityCode: "",
          district: district || "Riyadh, Al Olaya, King Fahed Road",
          detailedAddress: address,
          postalCode: postalCode
      },
        parcels: [
          {
              weight: "9.07",
              quantity: 1,
              cargoInfo: [
                  {
                    name: "ccc",
                    count: 1,
                    totalValue,
                    sku: "ccc555",
                    id: 13963710300434
                  }
              ]
          }
        ],
        additionalInfo: null
          }),
    });
    const res = await response.json();

    return res
  } catch (error) {
    console.error("Error retrieving data", error);
    return undefined;
  }
}
import Link from "next/link";
import React from "react";
import Form from "next/form";
import { ClerkLoaded, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Container from "./Container";
import Image from "next/image";
import logo from "@/images/logo.png";
import CartIcon from "./CartIcon";
import { BsBasket } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { FaAddressCard } from "react-icons/fa";
import { getMyOrders } from "@/sanity/helpers";

const Header = async () => {
  const user = await currentUser();
  const { userId } = await auth();
  let orders = null;
  if (userId) {
    orders = await getMyOrders(userId);
  }

  return (
      <div className="bg-white sticky top-0 z-50 border-b border-b-gray-200 py-1">
        <Container>
          <header className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 sm:py-4">
            <Link href={"/"} className="mb-2 sm:mb-0">
              <Image src={logo} alt="logo" className="w-20 sm:w-24" priority />
            </Link>
            <Form action="/search" className="w-full sm:flex-1 mb-2 sm:mb-0">
              <input
                  type="text"
                  name="query"
                  placeholder="Search for products"
                  className="bg-gray-50 text-gray-800 px-3 py-2 sm:px-4 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 border border-gray-200 w-full rounded-md transition-transform hover:-translate-y-px"
              />
            </Form>
            <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap sm:flex-nowrap">
              <CartIcon />
              <ClerkLoaded>
                <SignedIn>
                  <Link
                      href={"/orders"}
                      className="flex items-center text-xs sm:text-sm gap-1 sm:gap-2 border border-gray-200 px-1 sm:px-2 py-1 rounded-md shadow-md hover:shadow-none transition-transform hover:-translate-y-px"
                  >
                    <BsBasket className="text-xl sm:text-2xl text-pink-500" />
                    <div className="flex flex-col">
                      <p className="text-xs">
                      <span className="font-semibold">
                        {orders && orders?.length > 0 ? orders?.length : 0}
                      </span>{" "}
                        items
                      </p>
                      <p className="font-semibold">Orders</p>
                    </div>
                  </Link>
                  <Link
                      href={"/address"}
                      className="flex items-center text-xs sm:text-sm gap-1 sm:gap-2 border border-gray-200 px-1 sm:px-2 py-1 rounded-md shadow-md hover:shadow-none transition-transform hover:-translate-y-px"
                  >
                    <FaAddressCard className="text-xl sm:text-2xl text-pink-500" />
                    <div className="flex flex-col">
                      <p className="text-xs">Manage</p>
                      <p className="font-semibold">Address</p>
                    </div>
                  </Link>
                </SignedIn>
                {user ? (
                    <div className="flex items-center text-xs sm:text-sm gap-1 sm:gap-2 border border-gray-200 px-1 sm:px-2 py-1 rounded-md shadow-md hover:shadow-none transition-transform hover:-translate-y-px">
                      <UserButton />
                      <div className="text-xs">
                        <p className="text-gray-400">Welcome Back</p>
                        <p className="font-bold">{user?.fullName}</p>
                      </div>
                    </div>
                ) : (
                    <SignInButton mode="modal">
                      <div className="flex items-center text-xs sm:text-sm gap-1 sm:gap-2 border border-gray-200 px-1 sm:px-2 py-1 rounded-md shadow-md cursor-pointer hover:shadow-none transition-transform hover:-translate-y-px">
                        <FiUser className="text-xl sm:text-2xl text-pink-500" />
                        <div className="flex flex-col">
                          <p className="text-xs">Account</p>
                          <p className="font-semibold">Login</p>
                        </div>
                      </div>
                    </SignInButton>
                )}
              </ClerkLoaded>
            </div>
          </header>
        </Container>
      </div>
  );
};

export default Header;
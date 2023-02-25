import Head from "next/head";
import { Button } from "components";
import * as fcl from "@onflow/fcl";
import types from "@onflow/types";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ContextProvider, { ContainerContext } from "context/ContextProvider";

fcl
  .config()
  .put("accessNode.api", "https://rest-testnet.onflow.org")
  .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn");

export default function Navbar() {
  const { currentUser, setCurrentUser } = useContext(ContainerContext);
  const router = useRouter();
  const handleLogin = () => {
    fcl.authenticate();
  };
  useEffect(() => {
    fcl.currentUser.subscribe(setCurrentUser);
  }, []);
  return (
    <div>
      <nav className="flex items-center justify-between px-20 h-[70px] bg-gray-800">
        <Link href="/">
          <i className="text-[36px] font-bold cursor-pointer">FLOW NFT</i>
        </Link>
        <div className="flex gap-6">
          <Button
            handleClick={() => router.push("/createNft")}
            btnName="Create NFT"
          />
          <Button
            btnName={currentUser.addr ? currentUser.addr : "Login"}
            handleClick={handleLogin}
          />
        </div>
      </nav>
    </div>
  );
}

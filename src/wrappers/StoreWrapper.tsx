"use client";

import store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

import { ReactNode } from "react";

function StoreWrapper({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default StoreWrapper;

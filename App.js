import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { ClerkProvider, SignedIn, SignedOut,useClerk, useAuth, useSessionList, useSignIn } from "@clerk/clerk-expo";
import Constants from "expo-constants"
import SignInScreen from "./components/SignInScreen";
import SignUpScreen from "./components/SignUpScreen";
import Dashboard from "./components/dashboard";
import * as SecureStore from "expo-secure-store";
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {


  return (
    <ClerkProvider publishableKey={Constants.expoConfig.extra.clerkPublishableKey}
    tokenCache={tokenCache}>
      <SafeAreaView styles={styles.container}>
        <SignedIn>
          <Dashboard />
        </SignedIn>
        <SignedOut>
          <SignInScreen />
          <SignUpScreen />
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
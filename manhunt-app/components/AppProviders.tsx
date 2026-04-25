import { PropsWithChildren, useRef } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

type AppProvidersProps = PropsWithChildren;

export function AppProviders({ children }: AppProvidersProps) {
  const clientRef = useRef<ConvexReactClient | null>(null);

  if (!clientRef.current) {
    const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      throw new Error("EXPO_PUBLIC_CONVEX_URL is required to connect to Convex.");
    }

    clientRef.current = new ConvexReactClient(convexUrl);
  }

  return <ConvexProvider client={clientRef.current}>{children}</ConvexProvider>;
}
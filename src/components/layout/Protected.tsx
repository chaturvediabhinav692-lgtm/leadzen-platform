"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Protected({ children }: { children: React.ReactNode }) {
    // REDIRECTION DISABLED
    // Page-level guards in /dashboard sub-paths now handle auth verification.
    return <>{children}</>;
}

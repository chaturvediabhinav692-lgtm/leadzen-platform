"use client";

import { useEffect } from "react";
import RealEstateDashboard from "@/app/(app)/broker/page";
import AppLayout from "@/app/(app)/layout";
import RouteGuard from "@/components/layout/RouteGuard";

export default function Page() {
    return (
        <RouteGuard allowedRoles={['broker', 'admin']}>
            <AppLayout>
                <RealEstateDashboard />
            </AppLayout>
        </RouteGuard>
    );
}

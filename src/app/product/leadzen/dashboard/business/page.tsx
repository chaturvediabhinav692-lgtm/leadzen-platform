"use client";

import { useEffect } from "react";
import BusinessDashboard from "@/app/(app)/dashboard/page";
import AppLayout from "@/app/(app)/layout";
import RouteGuard from "@/components/layout/RouteGuard";

export default function BusinessDashboardPage() {
    return (
        <RouteGuard allowedRoles={['owner', 'admin']}>
            <AppLayout>
                <BusinessDashboard />
            </AppLayout>
        </RouteGuard>
    );
}

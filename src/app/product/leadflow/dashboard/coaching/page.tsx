"use client";

import { useEffect } from "react";
import CoachingDashboard from "@/app/(app)/dashboard/page";
import AppLayout from "@/app/(app)/layout";
import RouteGuard from "@/components/layout/RouteGuard";

export default function Page() {
    return (
        <RouteGuard allowedRoles={['coaching', 'admin']}>
            <AppLayout>
                <CoachingDashboard />
            </AppLayout>
        </RouteGuard>
    );
}

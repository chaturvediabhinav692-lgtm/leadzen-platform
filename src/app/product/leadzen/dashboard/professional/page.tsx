"use client";

import { useEffect } from "react";
import ProfessionalDashboard from "@/app/(app)/professional/page";
import AppLayout from "@/app/(app)/layout";
import RouteGuard from "@/components/layout/RouteGuard";

export default function ProfessionalDashboardPage() {
    return (
        <RouteGuard allowedRoles={['broker', 'admin']}>
            <AppLayout>
                <ProfessionalDashboard />
            </AppLayout>
        </RouteGuard>
    );
}

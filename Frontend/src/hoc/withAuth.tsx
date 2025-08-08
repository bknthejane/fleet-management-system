'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";
import useApp from "antd/es/app/useApp";

interface WithAuthProps {
    allowedRoles?: string[];
}

const withAuth = <P extends object> (
    WrappedComponent: React.ComponentType<P>,
    {allowedRoles = [] } : WithAuthProps = {}
) : React.FC<P> => {
    const ComponentWithAuth: React.FC<P> = (props) => {
        const router = useRouter();
        const [isAuthorized, setIsAuthorized] = useState(false);
        const app = useApp();

        useEffect(() => {
            const token = sessionStorage.getItem("token");
            const userRole = sessionStorage.getItem("role");

            if (!token) {
                router.push("/login");
                return;
            }

            if (allowedRoles.length > 0 && !allowedRoles.includes(userRole || "")) {
                if (userRole === "Admin") {
                    router.push("/admin/dashboard");
                } else if (userRole === "MunicipalityAdmin") {
                    router.push("/municipality/dashboard");
                } else if (userRole === "Supervisor") {
                    router.push("/supervisor/dashboard");
                } else if (userRole === "Driver") {
                    router.push("/driver/dashboard");
                } else if (userRole === "Mechanic") {
                    router.push("/mechanic/dashboard");
                } else {
                    app.message.error("Login failed. Please check your credentials.");
                    router.push("/login");
                }
                return;
            }

            setIsAuthorized(true);
        }, [router]);

        return isAuthorized ? <WrappedComponent {...props} /> : null;
    };

    ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

    return ComponentWithAuth;
};

export default withAuth;
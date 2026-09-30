"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="flex-row items-start justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Dashboard
            </p>
            <CardTitle className="mt-2 text-3xl">Bienvenido</CardTitle>
            <CardDescription className="mt-2">
              Sesión activa para {user?.email ?? "usuario autenticado"}.
            </CardDescription>
          </div>
          <Button
            variant="outline"
            onClick={async () => {
              await logout();
              router.replace("/login");
              router.refresh();
            }}
            type="button"
          >
            Cerrar sesión
          </Button>
        </CardHeader>
        <CardContent />
      </Card>
    </main>
  );
}

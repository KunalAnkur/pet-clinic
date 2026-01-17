import Link from "next/link";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, PawPrint } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center py-16 bg-muted paw-pattern">
        <div className="container mx-auto px-4 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <PawPrint className="w-12 h-12 text-primary" />
          </div>
          <h1 className="font-heading text-6xl font-bold text-primary mb-4">404</h1>
          <p className="text-muted-foreground mb-8">The page you're looking for has wandered off.</p>
          <Button asChild variant="default" size="lg">
            <Link href="/"><Home className="w-5 h-5" />Back to Home</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}

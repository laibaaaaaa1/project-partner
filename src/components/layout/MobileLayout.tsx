import { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { Header } from "./Header";

interface MobileLayoutProps {
  children: ReactNode;
  showNav?: boolean;
  showHeader?: boolean;
  headerTitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  headerActions?: ReactNode;
}

export function MobileLayout({
  children,
  showNav = true,
  showHeader = true,
  headerTitle,
  showBackButton = false,
  onBack,
  headerActions,
}: MobileLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {showHeader && (
        <Header
          title={headerTitle}
          showBackButton={showBackButton}
          onBack={onBack}
          actions={headerActions}
        />
      )}
      
      <main className={`flex-1 ${showNav ? "pb-nav-height" : ""} ${showHeader ? "" : "pt-safe"}`}>
        {children}
      </main>
      
      {showNav && <BottomNavigation />}
    </div>
  );
}
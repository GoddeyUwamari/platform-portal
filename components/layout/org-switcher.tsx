"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, PlusCircle, Building2 } from "lucide-react";
import { useAuth } from "@/lib/contexts/auth-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface OrgSwitcherProps {
  onCreateOrg?: () => void;
}

export function OrgSwitcher({ onCreateOrg }: OrgSwitcherProps) {
  const { organization, organizations, switchOrganization, isLoading } =
    useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSwitchOrg = async (orgId: string) => {
    if (orgId === organization?.id) return;
    await switchOrganization(orgId);
    setIsOpen(false);
  };

  const handleCreateOrg = () => {
    setIsOpen(false);
    onCreateOrg?.();
  };

  if (isLoading || !organization) {
    return (
      <div className="flex h-9 min-w-[200px] items-center justify-between rounded-md border border-input bg-background px-3">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  // Get organization initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Select organization"
          className="min-w-[200px] max-w-[280px] justify-between"
          title={organization.displayName || organization.name}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <Avatar className="h-5 w-5 shrink-0">
              <AvatarFallback className="text-[10px]">
                {getInitials(organization.name)}
              </AvatarFallback>
            </Avatar>
            <span className="truncate text-sm font-medium">
              {organization.displayName || organization.name}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[200px] max-w-[280px]">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onSelect={() => handleSwitchOrg(org.id)}
            className="cursor-pointer"
          >
            <div className="flex w-full items-center gap-2">
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-[10px]">
                  {getInitials(org.name)}
                </AvatarFallback>
              </Avatar>
              <span className="flex-1 truncate text-sm">
                {org.displayName || org.name}
              </span>
              {org.id === organization.id && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={handleCreateOrg}
          className="cursor-pointer"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>Create organization</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

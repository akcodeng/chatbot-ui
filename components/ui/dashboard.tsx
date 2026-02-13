"use client"

import { Sidebar } from "@/components/sidebar/sidebar"
import { SidebarSwitcher } from "@/components/sidebar/sidebar-switcher"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"
import { Tabs } from "@/components/ui/tabs"
import useHotkey from "@/lib/hooks/use-hotkey"
import { cn } from "@/lib/utils"
import { ContentType } from "@/types"
import { IconChevronCompactRight, IconMenu2 } from "@tabler/icons-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FC, useEffect, useState } from "react"
import { useSelectFileHandler } from "../chat/chat-hooks/use-select-file-handler"
import { CommandK } from "../utility/command-k"

export const SIDEBAR_WIDTH = 350

interface DashboardProps {
  children: React.ReactNode
}

export const Dashboard: FC<DashboardProps> = ({ children }) => {
  useHotkey("s", () => setShowSidebar(prevState => !prevState))

  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabValue = searchParams.get("tab") || "chats"

  const { handleSelectDeviceFile } = useSelectFileHandler()

  const [contentType, setContentType] = useState<ContentType>(
    tabValue as ContentType
  )
  const [showSidebar, setShowSidebar] = useState(
    localStorage.getItem("showSidebar") === "true"
  )
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const onFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    const files = event.dataTransfer.files
    const file = files[0]

    handleSelectDeviceFile(file)

    setIsDragging(false)
  }

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileSheetOpen(true)
    } else {
      setShowSidebar(prevState => !prevState)
      localStorage.setItem("showSidebar", String(!showSidebar))
    }
  }

  const sidebarContent = (
    <Tabs
      className="flex h-full"
      value={contentType}
      onValueChange={tabValue => {
        setContentType(tabValue as ContentType)
        router.replace(`${pathname}?tab=${tabValue}`)
      }}
    >
      <SidebarSwitcher onContentTypeChange={setContentType} />
      <Sidebar contentType={contentType} showSidebar={true} />
    </Tabs>
  )

  return (
    <div className="flex size-full">
      <CommandK />

      {/* Mobile Sheet Sidebar */}
      {isMobile && (
        <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
          <SheetContent side="left" className="w-[320px] p-0 sm:w-[350px]">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <div
          className={cn(
            "sidebar-transition dark:border-none",
            showSidebar ? "border-r-2" : ""
          )}
          style={{
            minWidth: showSidebar ? `${SIDEBAR_WIDTH}px` : "0px",
            maxWidth: showSidebar ? `${SIDEBAR_WIDTH}px` : "0px",
            width: showSidebar ? `${SIDEBAR_WIDTH}px` : "0px"
          }}
        >
          {showSidebar && sidebarContent}
        </div>
      )}

      <div
        className="bg-muted/50 relative flex w-full min-w-0 grow flex-col"
        onDrop={onFileDrop}
        onDragOver={onDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {/* Mobile header with hamburger */}
        {isMobile && (
          <div className="bg-background/80 sticky top-0 z-20 flex items-center border-b px-3 py-2 backdrop-blur-sm">
            <Button
              variant="ghost"
              size="icon"
              className="size-9"
              onClick={() => setMobileSheetOpen(true)}
            >
              <IconMenu2 size={20} />
              <span className="sr-only">Open sidebar</span>
            </Button>
          </div>
        )}

        {isDragging ? (
          <div className="flex h-full items-center justify-center bg-black/50 text-2xl text-white">
            drop file here
          </div>
        ) : (
          children
        )}

        {/* Desktop toggle button */}
        {!isMobile && (
          <Button
            className={cn(
              "absolute left-[4px] top-[50%] z-10 size-[32px] cursor-pointer"
            )}
            style={{
              transform: showSidebar ? "rotate(180deg)" : "rotate(0deg)"
            }}
            variant="ghost"
            size="icon"
            onClick={handleToggleSidebar}
          >
            <IconChevronCompactRight size={24} />
          </Button>
        )}
      </div>
    </div>
  )
}

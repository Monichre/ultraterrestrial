'use client'
import React, { useCallback, useEffect, useState } from 'react'
import {
  AppSidebar,
  AppSidebarBody,
  AppSidebarLink,
} from '@/components/app-sidebar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/utils/cn'
import {
  LayoutDashboardIcon,
  User,
  ArrowBigLeft,
  Settings,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  Sheet,
  ShoppingCart,
  Users2,
  DollarSign,
} from 'lucide-react'

import { RecordsTable } from '@/features/admin/ui/RecordsTable'
import { SelectedRecordsList } from './ui/SelectedRecordsList'
import { AnimatedGridPatternBackground } from '@/components/backgrounds/animated-grid-pattern'
import {
  getTopics,
  getKeyFigures,
  getTestimonies,
  getOrganizations,
  getEvents,
} from '@/app/admin/actions'

import { SheetTrigger, SheetContent } from '@/components/ui/sheet'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
import { DotPattern, Meteors } from '@/components/backgrounds'
import { AdminDashboardGlobe } from '@/components/ui/globe'

export const Logo = () => {
  return (
    <Link
      href='#'
      className='font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20'
    >
      <div className='h-5 w-6  rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0' />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='font-medium text-black dark:text-white whitespace-pre'
      >
        Acet Labs
      </motion.span>
    </Link>
  )
}
export const LogoIcon = () => {
  return (
    <Link
      href='#'
      className='font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20'
    >
      <div className='h-5 w-6  rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0' />
    </Link>
  )
}

// Dummy dashboard component with content
export const DashboardContent = ({ children }: any) => {
  return (
    <div className=' border border-white/50 dark:border-neutral-700/50 rounded-[calc(var(--radius)-4px)] flex flex-col gap-2 flex-1 w-full h-auto overflow-scroll relative'>
      {children}
    </div>
  )
}
const makeLinks = (updateCurrentSection) => [
  {
    label: 'Events',
    onClick: () => updateCurrentSection('events'),
    icon: (
      <LayoutDashboardIcon className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
    ),
  },
  {
    label: 'Key Figures',
    onClick: () => updateCurrentSection('personnel'),
    icon: (
      <User className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
    ),
  },
  {
    label: 'Topics',
    onClick: () => updateCurrentSection('topics'),
    icon: (
      <Settings className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
    ),
  },
  {
    label: 'Testimonies',
    onClick: () => updateCurrentSection('testimonies'),
    icon: (
      <ArrowBigLeft className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
    ),
  },
  {
    label: 'Organizations',
    onClick: () => updateCurrentSection('organizations'),
    icon: (
      <ArrowBigLeft className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
    ),
  },
  {
    label: 'Documents',
    onClick: () => updateCurrentSection('documents'),
    icon: (
      <ArrowBigLeft className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
    ),
  },
]
export const AdminDashboard = (props: any) => {
  const [activeSection, setActiveSection]: any = useState('events')
  const [events, setEvents]: any = useState(null)
  const [topics, setTopics]: any = useState(null)
  const [personnel, setPersonnel]: any = useState(null)
  const [testimonies, setTestimonies]: any = useState(null)
  const [organizations, setOrganizations]: any = useState(null)
  const [selectedRecords, setSelectedRecords]: any = useState([])

  const activeRecords =
    activeSection === 'events'
      ? events
      : activeSection === 'personnel'
        ? personnel
        : activeSection === 'topics'
          ? topics
          : activeSection === 'testimonies'
            ? testimonies
            : activeSection === 'organizations'
              ? organizations
              : null
  const updateCurrentSection = (model: string) => {
    console.log('model: ', model)
    setActiveSection(model)
  }

  const [open, setOpen] = useState(false)

  const links = makeLinks(updateCurrentSection)

  const addItemToSelectedRecordsList = useCallback((item: any) => {
    console.log('item: ', item)

    setSelectedRecords((selectedRecords: any) => [...selectedRecords, item])
  }, [])

  useEffect(() => {
    if (activeSection === 'events' && !events?.length) {
      getEvents().then((res: any) => setEvents(res))
    }
    if (activeSection === 'personnel' && !personnel?.length) {
      getKeyFigures().then((res: any) => setPersonnel(res))
    }
    if (activeSection === 'topics' && !topics?.length) {
      getTopics().then((res: any) => setTopics(res))
    }
    if (activeSection === 'testimonies' && !testimonies?.length) {
      getTestimonies().then((res: any) => setTestimonies(res))
    }
    if (activeSection === 'organizations' && !organizations?.length) {
      getOrganizations().then((res: any) => setOrganizations(res))
    }
  }, [
    activeSection,
    events,
    organizations?.length,
    personnel?.length,
    testimonies?.length,
    topics?.length,
  ])
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row w-screen flex-1 mx-auto border border-white/50 dark:border-neutral-700/50 rounded-[calc(var(--radius)-4px)] overflow-hidden relative left-0 bottom-0 top-0',
        'h-[100vh]' // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      {/* <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:7px_14px] z-0'></div> */}
      {/* <div className='absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]'></div> */}

      <AppSidebar open={open} setOpen={setOpen}>
        <AppSidebarBody className='justify-between gap-10 z-10'>
          <div className='flex flex-col flex-1 overflow-y-auto'>
            {open ? <Logo /> : <LogoIcon />}
            <div className='mt-8 flex flex-col gap-2'>
              {links.map((link, idx) => (
                <AppSidebarLink key={idx} {...link} />
              ))}
            </div>
          </div>
          <div>
            <AppSidebarLink
              link={{
                label: 'Manu Arora',
                href: '#',
                icon: (
                  <Image
                    src='/foofighters.webp'
                    className='h-7 w-7 flex-shrink-0 rounded-full'
                    width={50}
                    height={50}
                    alt='Avatar'
                  />
                ),
              }}
            />
          </div>
        </AppSidebarBody>
      </AppSidebar>
      <DashboardContent>
        <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-black border-b border-b-neutral-700/50 shadow-sm px-4 sm:h-auto md:border-b-1  py-2'>
          <Breadcrumb className='hidden md:flex'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='#'>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href='#'>{activeSection}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>All</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className='relative ml-auto flex-1 md:grow-0'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search...'
              className='w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]'
            />
          </div>
        </header>
        <main className='relative p-8'>
          <div className='w-full flex justify-between relative overflow-hidden z-20'>
            <SelectedRecordsList selectedRecords={selectedRecords} />

            {activeSection === 'events' && selectedRecords && (
              <div className='min-w-[400px] h-[400px] w-auto relative overflow-hidden'>
                <AdminDashboardGlobe
                  markers={
                    selectedRecords
                      ? selectedRecords.map((item: any) => ({
                          location: [item?.latitude, item?.longitude],
                          size: 0.05,
                        }))
                      : []
                  }
                />
              </div>
            )}
          </div>
          {activeSection && activeRecords && (
            <RecordsTable
              model={activeSection}
              records={activeRecords}
              addItemToSelectedRecordsList={addItemToSelectedRecordsList}
            />
          )}
          <DotPattern
            width={20}
            height={20}
            cx={1}
            cy={1}
            cr={1}
            className={cn(
              '[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] pointer-none'
            )}
          />
        </main>
      </DashboardContent>
    </div>
  )
}

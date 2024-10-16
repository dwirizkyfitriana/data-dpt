import { navs } from '@/constants/navs'
import SidebarItem from './SidebarItem'
import { ResizablePanel } from '../ui/resizable'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Box } from 'lucide-react'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    // <div className='sticky left-0 top-0 hidden border-r xl:block'>
    //   <div className='flex h-full max-h-screen flex-col gap-2'>
    //     <div className='flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6'>
    //       <a href='/' className='flex items-center gap-2 font-semibold'>
    //         Qitara
    //       </a>
    //       <p className='text-xs'>v.1.0.0</p>
    //     </div>
    //     <div className='flex-1'>
    //       <nav className='group grid items-start px-2 text-sm font-medium lg:px-4'>
    //         {navs.map((nav) => (
    //           <SidebarItem key={nav.label} nav={nav} />
    //         ))}
    //       </nav>
    //     </div>
    //   </div>
    // </div>
    <ResizablePanel
      defaultSize={20}
      collapsedSize={4}
      collapsible
      minSize={15}
      maxSize={20}
      onCollapse={() => {
        setIsCollapsed(true)
        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`
      }}
      onResize={() => {
        setIsCollapsed(false)
        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`
      }}
      className={cn('flex flex-col', {
        'min-w-[3.125rem] transition-all duration-300 ease-in-out items-center': isCollapsed
      })}
    >
      <div className='flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6'>
        <a href='/' className='flex items-center gap-2 font-semibold'>
          {isCollapsed ? <Box /> : 'Qitara'}
        </a>
        {!isCollapsed && <p className='text-xs'>v.1.0.0</p>}
      </div>
      <nav className='group grid items-start px-2 text-sm font-medium lg:px-4'>
        {navs.map((nav) => (
          <SidebarItem key={nav.label} nav={nav} isCollapsed={isCollapsed} />
        ))}
      </nav>
    </ResizablePanel>
  )
}

export default Sidebar

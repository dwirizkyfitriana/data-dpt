import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TableCell, TableRow } from '@/components/ui/table'
import { Check, Pen, Upload, X } from 'lucide-react'
import { useRef, useState } from 'react'

const VoteItem = () => {
  const [editMode, setEditMode] = useState(false)
  const imageRef = useRef<HTMLInputElement | null>(null)

  return (
    <TableRow className='[&>*:not(:first-child):not(:last-child)]:border [&>*:not(:first-child):not(:last-child)]:border-b-0'>
      <TableCell className='text-center font-semibold'>TPS 100</TableCell>
      <TableCell className='text-center'>{editMode ? <Input className='max-w-16' /> : '100'}</TableCell>
      <TableCell className='text-center'>{editMode ? <Input className='max-w-16' /> : '100'}</TableCell>
      <TableCell className='text-center'>{editMode ? <Input className='max-w-16' /> : '100'}</TableCell>
      <TableCell className='text-center'>{editMode ? <Input className='max-w-16' /> : '100'}</TableCell>
      <TableCell className='text-center'>400</TableCell>
      <TableCell className='text-center'>3120</TableCell>
      <TableCell className='text-center'>{editMode ? <Input className='max-w-16' /> : '100'}</TableCell>
      <TableCell className='text-center'>{editMode ? <Input className='max-w-16' /> : '100'}</TableCell>
      <TableCell className='text-center'>
        {editMode ? (
          <div>
            <Button
              type='button'
              size='sm'
              className='gap-2 text-xs font-normal'
              onClick={() => imageRef.current?.click()}
            >
              <Upload className='size-4' />
              Upload
            </Button>
            <Input ref={imageRef} type='file' accept='image/jpeg, image/png' className='hidden' />
          </div>
        ) : (
          <Button variant='link' className='p-0 text-indigo-500'>
            Lihat
          </Button>
        )}
      </TableCell>
      <TableCell className='text-center'>Langkap</TableCell>
      <TableCell className='flex items-center justify-center gap-1'>
        {!editMode ? (
          <Button type='button' variant='secondary' className='p-2 h-fit' onClick={() => setEditMode(true)}>
            <Pen className='size-4' />
          </Button>
        ) : (
          <>
            <Button type='button' variant='destructive' className='p-2 h-fit' onClick={() => setEditMode(false)}>
              <X className='size-4' />
            </Button>
            <Button
              type='button'
              className='p-2 h-fit bg-green-500 hover:bg-green-500/90 text-white'
              onClick={() => setEditMode(false)}
            >
              <Check className='size-4' />
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  )
}

export default VoteItem

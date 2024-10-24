import useFetchDistricts from '@/features/dpt/queries/useFetchDistricts'
import useFetchSubdistricts from '@/features/dpt/queries/useFetchSubdistricts'
import { cn } from '@/lib/utils'
import useFetchCities from '@/queries/useFetchCities'
import useFetchProvinces from '@/queries/useFetchProvinces'
import { FilterX } from 'lucide-react'
import { useState } from 'react'
import LoadingOverlay from './LoadingOverlay'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const list = ['province', 'city', 'district', 'subdistrict']

const PageFilter = () => {
  const { data: provinces, isLoading: isLoadingProvinces } = useFetchProvinces()
  const { mutate: fetchCities, data: cities, isPending: isLoadingCities } = useFetchCities()
  const { mutate: fetchDistricts, data: districts, isPending: isLoadingDistricts } = useFetchDistricts()
  const { mutate: fetchSubdistricts, data: subdistricts, isPending: isLoadingSubdistricts } = useFetchSubdistricts()

  const isLoading = isLoadingProvinces || isLoadingCities || isLoadingDistricts || isLoadingSubdistricts

  const [selections, setSelections] = useState({
    province: '0',
    city: '0',
    district: '0',
    subdistrict: '0'
  })

  const handleSelectionChange = (field: keyof typeof selections, value: string) => {
    setSelections((prev) => ({ ...prev, [field]: value }))

    if (field === 'province') fetchCities(value)
    if (field === 'city') fetchDistricts(value)
    if (field === 'district') fetchSubdistricts(value)
  }

  const getFieldValue = (field: string) => {
    return field === 'province'
      ? provinces
      : field === 'city'
      ? cities
      : field === 'district'
      ? districts
      : subdistricts
  }

  const resetFilter = () => {
    setSelections({
      province: '0',
      city: '0',
      district: '0',
      subdistrict: '0'
    })
  }

  if (isLoading) return <LoadingOverlay />

  return (
    <div className='grid grid-cols-4 items-center gap-4'>
      {list.map((field, index) => (
        <div key={index} className={cn({ 'flex items-center gap-2': index === list.length - 1 })}>
          <Select
            value={selections[field as keyof typeof selections]}
            onValueChange={(value) => handleSelectionChange(field as keyof typeof selections, value)}
          >
            <SelectTrigger className='capitalize w-full'>
              <SelectValue placeholder='Pilih Pemilu' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='0'>Semua</SelectItem>
              {getFieldValue(field)?.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {index === list.length - 1 && (
            <Button variant='outline' onClick={resetFilter}>
              <span className='hidden lg:block text-blue-500'>Reset Filter</span>
              <FilterX className='size-4 block lg:hidden' />
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}

export default PageFilter

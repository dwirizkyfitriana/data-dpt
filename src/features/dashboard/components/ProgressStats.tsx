import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { QuickCount } from '../services/dashboard.service'

const calcPercentage = (total: number, count: number) => {
  return (count * 100) / total
}

const ProgressStats = ({ quickCount }: { quickCount: QuickCount }) => {
  return (
    <div className='flex items-center w-full h-8 [&>div:first-child]:rounded-l-xl [&>div:last-child]:rounded-r-xl rounded-xl border-grey-500 border'>
      {quickCount.calon_hasil.map((item) => (
        <Tooltip key={item.id_paslon}>
          <TooltipTrigger asChild>
            <div
              style={{
                backgroundColor: item.warna,
                width: calcPercentage(quickCount.total_dpt - quickCount.total_suara_tidak_sah, item.jumlah_suara) + '%',
                height: '100%'
              }}
            ></div>
          </TooltipTrigger>
          <TooltipContent>
            <div className='grid items-center grid-cols-[3px_1fr] gap-2'>
              <div className='h-full rounded-lg' style={{ backgroundColor: item.warna }}></div>
              <div className='flex flex-col gap-1'>
                <p>
                  {item.nama} & {item.nama_vice}
                </p>
                <p>
                  {Number(item.jumlah_suara).toLocaleString('id')}{' '}
                  <span className='font-medium'>
                    (
                    {Number(
                      calcPercentage(quickCount.total_dpt - quickCount.total_suara_tidak_sah, item.jumlah_suara)
                    ).toLocaleString('id', { maximumFractionDigits: 2 })}{' '}
                    %)
                  </span>
                </p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      ))}

      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className='bg-grey-500 h-full'
            style={{
              width:
                calcPercentage(
                  quickCount.total_dpt - quickCount.total_suara_tidak_sah,
                  quickCount.total_dpt - quickCount.total_suara_tidak_sah - quickCount.total_suara_masuk
                ) + '%'
            }}
          ></div>
        </TooltipTrigger>
        <TooltipContent>
          <div className='grid items-center grid-cols-[3px_1fr] gap-2'>
            <div className='h-full rounded-lg bg-grey-500'></div>
            <div className='flex flex-col gap-1'>
              <p>Suara Belum Masuk</p>
              <p>
                {Number(
                  quickCount.total_dpt - quickCount.total_suara_tidak_sah - quickCount.total_suara_masuk
                ).toLocaleString('id')}{' '}
                <span className='font-medium'>
                  (
                  {Number(
                    calcPercentage(
                      quickCount.total_dpt - quickCount.total_suara_tidak_sah,
                      quickCount.total_dpt - quickCount.total_suara_tidak_sah - quickCount.total_suara_masuk
                    )
                  ).toLocaleString('id', { maximumFractionDigits: 2 })}{' '}
                  %)
                </span>
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

export default ProgressStats
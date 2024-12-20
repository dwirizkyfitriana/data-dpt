import { cn } from '@/lib/utils'
import { QuickCountCandidate } from '../services/dashboard.service'

const CandidateCardItem = ({ totalData, candidate }: { totalData: number; candidate: QuickCountCandidate }) => {
  return (
    <div className={cn('flex items-center gap-4 justify-center', { 'flex-col': totalData > 3 })}>
      <div className='relative'>
        <img
          alt='paslon'
          src={candidate.foto}
          draggable={false}
          className='rounded-xl size-[110px] aspect-square object-cover border-[3px] border-blue-400'
          style={{ borderColor: candidate.warna }}
        />
        <div className='absolute bottom-2 right-2 bg-red-500 text-white size-5 rounded text-xs flex items-center justify-center'>
          {candidate.no_urut}
        </div>
      </div>
      <div className={cn('space-y-1', { 'text-center': totalData > 3 })}>
        <div>
          <h1 className='font-bold text-3xl text-dark-700'>
            {Number(candidate.persentase).toLocaleString('id', { maximumFractionDigits: 2 })}%
          </h1>
          <p className='text-dark-700'>
            {Number(candidate.jumlah_suara).toLocaleString('id', { maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className='text-sm font-medium'>
          <h3>{candidate.nama}</h3>
          <h3>{candidate.nama_vice}</h3>
        </div>
      </div>
    </div>
  )
}

export default CandidateCardItem

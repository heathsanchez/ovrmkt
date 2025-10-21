import { useState } from 'react'
import AddressAutocomplete from './AddressAutocomplete'
import { estimateByAddressString } from '../api/client'

export default function PropertyValuation({ onValuation }){
  const [selected, setSelected] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleEstimate(){
    if(!selected) return
    setLoading(true)
    try{
      const address = selected.description || selected.label || ''
      const result = await estimateByAddressString(address)
      setData(result)
      onValuation?.(result)
      if(window.fbq){
        window.fbq('track', 'Lead', { content_name: result?.address || address || 'Valuation', currency: 'NZD', value: 0 })
      }
    }catch(e){
      setData({ error: 'Could not fetch estimate. Please try again.' })
    }finally{ setLoading(false) }
  }

  return (
    <div>
      <AddressAutocomplete onSelect={setSelected} />
      <button className="btn" onClick={handleEstimate} disabled={loading || !selected}>
        {loading ? 'Calculating…' : 'See Your Estimate'}
      </button>

      {data && (
        <div className="card" style={{marginTop:12}}>
          {data.error ? <p className="error">{data.error}</p> : (
            <div>
              {data.address && <div className="small">{data.address}</div>}
              {data.estimate && <div className="value">{data.estimate}</div>}
              {data.estimated_range && <div className="small">Range: {data.estimated_range}</div>}
              {data.cv_rv && <div className="small">CV/RV: {data.cv_rv}</div>}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

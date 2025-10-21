import { useState } from 'react'
import PropertyValuation from '../components/PropertyValuation'
import LeadForm from '../components/LeadForm'

export default function Home(){
  const [valuation, setValuation] = useState(null)

  return (
    <div className="container">
      <h1 className="h1">
        Find your NZ property’s value <span className="brand">in 5 seconds</span>
      </h1>
      <p className="p">Get an instant estimate and see which local agent consistently gets top results.</p>

      <div className="row" style={{marginTop: 20}}>
        <div className="card">
          <PropertyValuation onValuation={setValuation} />
        </div>
        {valuation && (
          <div className="card">
            <LeadForm address={valuation.address || ''} valuation={valuation} />
          </div>
        )}
      </div>
    </div>
  )
}

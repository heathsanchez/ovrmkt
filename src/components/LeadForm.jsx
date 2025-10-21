import { useState } from 'react'
import { submitLead } from '../api/client'

export default function LeadForm({ address, valuation }){
  const [form, setForm] = useState({ name:'', phone:'', email:'', timeline:'0-3 months' })
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')

  async function onSubmit(e){
    e.preventDefault()
    setErr('')
    try{
      await submitLead({
        address,
        estimate: valuation?.estimate || null,
        range: valuation?.estimated_range || null,
        cv_rv: valuation?.cv_rv || null,
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        timeline: form.timeline,
        source: 'overmarket-web'
      })
      setDone(true)
    }catch(e){
      setErr('Could not submit. Please try again.')
    }
  }

  if(done) return <div className="card">Thanks! We’ll introduce you to your best local agent shortly.</div>

  return (
    <form onSubmit={onSubmit} className="row">
      <input className="input" required placeholder="Full name" value={form.name} onChange={e=>setForm(s=>({...s, name:e.target.value}))} />
      <input className="input" required placeholder="Mobile" value={form.phone} onChange={e=>setForm(s=>({...s, phone:e.target.value}))} />
      <input className="input" placeholder="Email (optional)" value={form.email} onChange={e=>setForm(s=>({...s, email:e.target.value}))} />
      <select className="input" value={form.timeline} onChange={e=>setForm(s=>({...s, timeline:e.target.value}))}>
        <option>0-3 months</option>
        <option>3-6 months</option>
        <option>6-12 months</option>
        <option>Just curious</option>
      </select>
      {err && <div className="error">{err}</div>}
      <button className="btn" type="submit">Get your agent match</button>
    </form>
  )
}

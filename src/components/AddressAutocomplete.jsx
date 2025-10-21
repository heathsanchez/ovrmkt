import { useEffect, useRef, useState } from 'react'
import { autocomplete } from '../api/client'

export default function AddressAutocomplete({ onSelect, placeholder='Enter your address' }){
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const boxRef = useRef(null)
  const tRef = useRef(null)

  useEffect(() => {
    const onClick = (e) => { if(boxRef.current && !boxRef.current.contains(e.target)) setOpen(false) }
    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if(!q || q.trim().length < 3){ setItems([]); setOpen(false); return }
    setLoading(true)
    clearTimeout(tRef.current)
    tRef.current = setTimeout(async () => {
      try{
        const data = await autocomplete(q)
        setItems(Array.isArray(data?.predictions) ? data.predictions : [])
        setOpen(true)
      }catch(_e){
        setItems([]); setOpen(false)
      }finally{ setLoading(false) }
    }, 250)
  }, [q])

  return (
    <div ref={boxRef} style={{position:'relative', width:'100%'}}>
      <input className="input" value={q} onChange={e=>setQ(e.target.value)} placeholder={placeholder} onFocus={() => items.length && setOpen(true)} />
      {loading && <div className="small" style={{position:'absolute', right:12, top:'50%', transform:'translateY(-50%)'}}>Searching…</div>}
      {open && items.length>0 && (
        <ul className="list">
          {items.map(r => (
            <li key={r.id || r.description} className="item" onClick={() => { setQ(r.description || ''); setOpen(false); onSelect?.(r) }}>
              {r.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

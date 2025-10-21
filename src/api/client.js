const API_BASE = 'https://overmarket.onrender.com';

async function fetchJSON(url, opts){
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'omit',
    ...opts
  })
  if(!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}

export function autocomplete(query){
  const url = `${API_BASE}/autocomplete?query=${encodeURIComponent(query)}`
  return fetchJSON(url)
}

export function estimateByAddressString(address){
  const url = `${API_BASE}/property`
  return fetchJSON(url, { method:'POST', body: JSON.stringify({ address }) })
}

export function submitLead(payload){
  const url = `${API_BASE}/lead`
  return fetchJSON(url, { method:'POST', body: JSON.stringify(payload) })
}

export { fetchJSON }

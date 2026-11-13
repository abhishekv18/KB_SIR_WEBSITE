import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Mail } from 'lucide-react'
import { site } from '../content/site'
import { services } from '../content/services'

/**
 * Consultation form — frontend only.
 * - If `site.formEndpoint` is set (Formspree/Web3Forms…), it POSTs there and reports the real result.
 * - Otherwise it validates, then opens the visitor's email app with a pre-filled message.
 *   The button says so. Nothing ever claims a meeting has been booked.
 * Spam protection: hidden honeypot + minimum time on page before submit.
 */
const fields = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name', required: true },
  { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', required: true },
  { name: 'phone', label: 'Phone (optional)', type: 'tel', autoComplete: 'tel', required: false },
  { name: 'business', label: 'Business or organisation', type: 'text', autoComplete: 'organization', required: true },
]

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Enter your name.'
  if (!v.email.trim()) e.email = 'Enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) e.email = 'Enter an email address like name@company.com.'
  if (v.phone && !/^[+\d][\d\s()-]{6,}$/.test(v.phone)) e.phone = 'Enter a valid phone number, or leave it blank.'
  if (!v.business.trim()) e.business = 'Enter your business or organisation name.'
  if (v.message.trim().length < 20) e.message = 'Tell me a little more — at least 20 characters.'
  return e
}

export default function ContactForm({ dark = false }) {
  const started = useRef(0)
  useEffect(() => { started.current = Date.now() }, [])
  const summary = useRef(null)
  const [values, setValues] = useState({ name: '', email: '', phone: '', business: '', service: '', message: '', website: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [state, setState] = useState('idle') // idle | sending | handed-off | sent | failed
  const hasEndpoint = Boolean(site.formEndpoint)

  const set = (k) => (e) => {
    const next = { ...values, [k]: e.target.value }
    setValues(next)
    if (touched[k]) setErrors(validate(next))
  }
  const blur = (k) => () => { setTouched((t) => ({ ...t, [k]: true })); setErrors(validate(values)) }

  const submit = async (e) => {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setTouched({ name: 1, email: 1, phone: 1, business: 1, message: 1 })
    if (Object.keys(errs).length) { setTimeout(() => summary.current?.focus(), 0); return }
    if (values.website || Date.now() - started.current < 3000) return // likely a bot — silently ignore

    const serviceTitle = services.find((s) => s.slug === values.service)?.title || 'Not sure yet'
    if (hasEndpoint) {
      setState('sending')
      try {
        const res = await fetch(site.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ ...values, service: serviceTitle }) })
        setState(res.ok ? 'sent' : 'failed')
      } catch { setState('failed') }
      return
    }
    const body = `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone || '—'}\nBusiness: ${values.business}\nInterested in: ${serviceTitle}\n\n${values.message}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Consultation enquiry — ${values.business}`)}&body=${encodeURIComponent(body)}`
    setState('handed-off')
  }

  const errorList = Object.entries(errors).filter(([k]) => touched[k])
  const fieldCls = `peer w-full rounded-xl border bg-transparent px-4 pb-2.5 pt-6 text-[1rem] outline-none transition-colors ${dark ? 'border-white/20 text-white focus:border-gold' : 'border-navy/15 bg-white text-navy focus:border-navy'}`
  const labelCls = `pointer-events-none absolute left-4 top-2 text-[0.75rem] font-medium ${dark ? 'text-white/60' : 'text-ink-muted'}`

  return (
    <form onSubmit={submit} noValidate className="relative" aria-describedby="form-note">
      <AnimatePresence mode="wait">
        {state === 'sent' || state === 'handed-off' ? (
          <motion.div key="done" role="status" aria-live="polite" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`rounded-[var(--radius-card)] p-8 ${dark ? 'bg-white/5' : 'bg-ivory-deep'}`}>
            <p className="font-display text-3xl">{state === 'sent' ? 'Message sent.' : 'Your email app should now be open.'}</p>
            <p className={`mt-3 leading-relaxed ${dark ? 'text-white/70' : 'text-ink-muted'}`}>
              {state === 'sent'
                ? 'Thank you — your message has been delivered. Kunal will reply by email.'
                : <>Your message is ready to send from your own email app. If nothing opened, email <a className="underline" href={`mailto:${site.email}`}>{site.email}</a> directly.</>}
            </p>
            <button type="button" onClick={() => setState('idle')} className={`mt-6 text-sm underline ${dark ? 'text-gold' : 'text-gold-ink'}`}>Edit or send another message</button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={false} exit={{ opacity: 0, y: -8 }}>
            {errorList.length > 0 && (
              <div ref={summary} tabIndex={-1} role="alert" className="mb-6 rounded-xl border border-[#B4412F]/40 bg-[#B4412F]/8 p-4 text-sm outline-none">
                <p className="font-medium">Please fix {errorList.length === 1 ? 'this' : 'these'} before sending:</p>
                <ul className="mt-2 list-disc pl-5">{errorList.map(([k, m]) => <li key={k}><a href={`#f-${k}`} className="underline">{m}</a></li>)}</ul>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.name}>
                  <div className="relative">
                    <input id={`f-${f.name}`} name={f.name} type={f.type} autoComplete={f.autoComplete} required={f.required} value={values[f.name]} onChange={set(f.name)} onBlur={blur(f.name)} aria-invalid={Boolean(touched[f.name] && errors[f.name])} aria-describedby={errors[f.name] ? `e-${f.name}` : undefined} className={fieldCls} />
                    <label htmlFor={`f-${f.name}`} className={labelCls}>{f.label}{f.required && <span aria-hidden> *</span>}</label>
                  </div>
                  {touched[f.name] && errors[f.name] && <p id={`e-${f.name}`} className="mt-1.5 text-[0.8125rem] text-[#A63A28]">{errors[f.name]}</p>}
                </div>
              ))}
              <div className="sm:col-span-2">
                <div className="relative">
                  <select id="f-service" name="service" value={values.service} onChange={set('service')} className={`${fieldCls} appearance-none`}>
                    <option value="">Not sure yet</option>
                    {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
                  </select>
                  <label htmlFor="f-service" className={labelCls}>Which coaching interests you?</label>
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="relative">
                  <textarea id="f-message" name="message" rows={5} required value={values.message} onChange={set('message')} onBlur={blur('message')} aria-invalid={Boolean(touched.message && errors.message)} aria-describedby={errors.message ? 'e-message' : undefined} className={`${fieldCls} resize-y`} />
                  <label htmlFor="f-message" className={labelCls}>Where is your business today, and what would you like to change? *</label>
                </div>
                {touched.message && errors.message && <p id="e-message" className="mt-1.5 text-[0.8125rem] text-[#A63A28]">{errors.message}</p>}
              </div>
              {/* honeypot */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="f-website">Website</label>
                <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
              </div>
            </div>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" disabled={state === 'sending'} className="pill pill-gold self-start whitespace-normal text-left disabled:opacity-60">
                <span>{state === 'sending' ? 'Sending…' : hasEndpoint ? 'Send message' : 'Continue in your email app'}</span>
                <span className="pill-dot" aria-hidden>{hasEndpoint ? <ArrowRight size={17} strokeWidth={1.8} /> : <Mail size={16} strokeWidth={1.8} />}</span>
              </button>
              <p id="form-note" className={`max-w-xs text-[0.8125rem] leading-snug ${dark ? 'text-white/55' : 'text-ink-muted'}`}>
                {hasEndpoint ? 'Your details are used only to reply to your enquiry.' : 'This opens a pre-filled email to Kunal in your own email app — nothing is sent until you press send there.'}
              </p>
            </div>
            {state === 'failed' && <p role="alert" className="mt-4 text-sm text-[#A63A28]">The message couldn’t be sent. Please try again, or email {site.email} directly.</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

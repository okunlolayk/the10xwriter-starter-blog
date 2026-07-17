'use client'

import { useState } from 'react'

const BrandNewsletterForm = ({ title = 'Get the Research Stack Cheat Sheet' }) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div id="newsletter" className="text-center">
      <span className="wiki-tag text-signal mb-4 inline-flex items-center gap-2 font-mono text-xs tracking-[0.12em] uppercase">
        Join the list
      </span>
      <h2 className="text-paper-alt font-serif text-3xl leading-tight font-semibold sm:text-4xl">
        {title}
      </h2>
      <p className="text-paper-alt/65 mx-auto mt-4 max-w-md text-[15.5px]">
        One page. Every tool in the pipeline, what it&apos;s for, and where it hands off to the next
        one. Plus a weekly note — no fluff, just the system.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 flex max-w-md overflow-hidden rounded-sm border border-white/30"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-paper-alt placeholder:text-paper-alt/40 flex-1 bg-transparent px-4 py-3.5 text-sm focus:bg-white/5 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-signal text-ink px-5 font-mono text-[13px] font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === 'loading' ? 'Sending…' : status === 'success' ? 'Sent ✓' : 'Send it →'}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-3 font-mono text-xs text-red-400">
          Something went wrong — please try again.
        </p>
      )}
      <p className="text-paper-alt/40 mt-4 font-mono text-[11.5px]">
        One email a week. Unsubscribe anytime.
      </p>
    </div>
  )
}

export default BrandNewsletterForm

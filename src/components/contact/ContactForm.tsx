'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Lock } from 'lucide-react'

interface FormData {
  name: string
  businessName: string
  phone: string
  email: string
  website: string
  service: string
  message: string
}

const initialFormData: FormData = {
  name: '',
  businessName: '',
  phone: '',
  email: '',
  website: '',
  service: '',
  message: '',
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl text-[#4CAF50]">✓</div>
        <h3 className="text-xl font-bold text-[#361C24] mt-4 mb-2">
          Thanks! We&apos;ll be in touch within 1 business day.
        </h3>
        <p className="text-[#7A6458]">We&apos;ll review your info and reach out shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-semibold text-[#361C24] mb-1">
          Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-[#E0D4C4] rounded-xl bg-[#FDFAF7] focus:ring-2 focus:ring-[#D94A7A]"
        />
      </div>

      {/* Business Name */}
      <div className="mb-4">
        <label htmlFor="businessName" className="block text-sm font-semibold text-[#361C24] mb-1">
          Business Name
        </label>
        <Input
          id="businessName"
          name="businessName"
          type="text"
          required
          value={formData.businessName}
          onChange={handleChange}
          className="w-full border border-[#E0D4C4] rounded-xl bg-[#FDFAF7] focus:ring-2 focus:ring-[#D94A7A]"
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-semibold text-[#361C24] mb-1">
          Phone
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-[#E0D4C4] rounded-xl bg-[#FDFAF7] focus:ring-2 focus:ring-[#D94A7A]"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-semibold text-[#361C24] mb-1">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-[#E0D4C4] rounded-xl bg-[#FDFAF7] focus:ring-2 focus:ring-[#D94A7A]"
        />
      </div>

      {/* Website URL */}
      <div className="mb-4">
        <label htmlFor="website" className="block text-sm font-semibold text-[#361C24] mb-1">
          Current Website (optional)
        </label>
        <Input
          id="website"
          name="website"
          type="url"
          value={formData.website}
          onChange={handleChange}
          className="w-full border border-[#E0D4C4] rounded-xl bg-[#FDFAF7] focus:ring-2 focus:ring-[#D94A7A]"
        />
      </div>

      {/* Services */}
      <div className="mb-4">
        <label htmlFor="service" className="block text-sm font-semibold text-[#361C24] mb-1">
          Services
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full rounded-xl border border-[#E0D4C4] bg-[#FDFAF7] px-3 py-2 text-[#361C24] focus:outline-none focus:ring-2 focus:ring-[#D94A7A]"
        >
          <option value=""></option>
          <option value="website-design">Website Design</option>
          <option value="seo-google">SEO &amp; Google Business</option>
          <option value="full-management">Full Management (Double Scoop)</option>
          <option value="premium-management">Premium Management (Triple Scoop)</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>

      {/* Message */}
      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-semibold text-[#361C24] mb-1">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about your business..."
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-[#E0D4C4] rounded-xl bg-[#FDFAF7] focus:ring-2 focus:ring-[#D94A7A] resize-none"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#D94A7A] text-white py-4 text-lg rounded-xl font-semibold hover:bg-[#C23D69] h-auto"
      >
        {loading ? 'Sending...' : "Let's Talk →"}
      </Button>

      {/* Trust signal */}
      <div className="flex items-center gap-2 mt-3 text-sm text-[#9A8A7E]">
        <Lock size={14} />
        <span>Your info is safe with us. No spam, ever.</span>
      </div>
    </form>
  )
}

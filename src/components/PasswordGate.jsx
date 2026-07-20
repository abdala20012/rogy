import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './PasswordGate.css'

const CORRECT_PASSWORD = '247'

export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim().toLowerCase() === CORRECT_PASSWORD.toLowerCase()) {
      onUnlock()
    } else {
      setError(true)
      setTimeout(() => setError(false), 1500)
    }
  }

  return (
    <div className="gate-screen">
      <motion.div
        className="gate-card"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="gate-profile">
          <img
            src="/images/profile.jpg"
            alt="روجي"
            className="gate-profile-img"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        </div>
        <span className="gate-heart">♥</span>
        <h1 className="gate-title">لروجي 👑 فقط</h1>
        <p className="gate-subtitle">هدية عيد ميلادك.. أدخلي الباسورد عشان تشوفيها</p>

        <form className="gate-form" onSubmit={handleSubmit}>
          <input
            type="password"
            className={`gate-input ${error ? 'gate-input-error' : ''}`}
            placeholder="الباسورد"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
          <button type="submit" className="gate-button">افتحي القلب ♥</button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.p
              className="gate-error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              الباسورد مش صح.. جربي تاني ♥
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

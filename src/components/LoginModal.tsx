import { useState, type FormEvent } from 'react'
import { useAuth } from '../auth'
import { errorMessage } from '../api'
import Modal from './Modal'

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const { login } = useAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await login(password)
    } catch (err) {
      setError(errorMessage(err))
      setBusy(false)
    }
  }

  return (
    <Modal title="Connexion admin" onClose={onClose}>
      <form onSubmit={submit} className="stack">
        <label className="field">
          <span>Mot de passe</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus required />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn primary" disabled={busy}>
          Se connecter
        </button>
      </form>
    </Modal>
  )
}

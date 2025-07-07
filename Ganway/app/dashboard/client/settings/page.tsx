"use client"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const steps = [
  "Preferencias",
  "Datos personales",
  "Intereses/Estilos",
  "Privacidad",
]

const INTERESES = ["Moda", "Arte", "Diseño", "Tendencias", "Sostenibilidad", "Fotografía", "Belleza"]
const ESTILOS = ["Urbano", "Retro", "Minimalista", "Chic", "Grunge", "Casual", "Formal"]
const GENEROS = ["Femenino", "Masculino", "Otro"]
const VISIBILIDAD = ["Público", "Privado"]
const MOTIVOS = ["Inspiración", "Crear looks", "Vender productos", "Otra"]

const defaultData = {
  preferencias: {
    experiencia: "",
    motivo: "",
  },
  datos: {
    nombre: "",
    usuario: "",
    email: "",
    ciudad: "",
    país: "",
    genero: "",
  },
  intereses: {
    intereses: [] as string[],
    estilos: [] as string[],
  },
  privacidad: {
    visibilidad: "Público",
    password: "",
  },
}

export default function SettingsPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(defaultData)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const saved = localStorage.getItem("settings_form")
    if (saved) setForm(JSON.parse(saved))
  }, [])

  const handleChange = (section: string, field: string, value: any) => {
    setForm((prev) => {
      const updated = { ...prev, [section]: { ...prev[section as keyof typeof prev], [field]: value } }
      localStorage.setItem("settings_form", JSON.stringify(updated))
      return updated
    })
  }

  const handleTagToggle = (section: "intereses" | "estilos", value: string) => {
    setForm((prev) => {
      const arr = prev.intereses[section]
      const exists = arr.includes(value)
      const newArr = exists ? arr.filter((v: string) => v !== value) : [...arr, value]
      const updated = {
        ...prev,
        intereses: {
          ...prev.intereses,
          [section]: newArr,
        },
      }
      localStorage.setItem("settings_form", JSON.stringify(updated))
      return updated
    })
  }

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1))
  const handlePrev = () => setStep((s) => Math.max(s - 1, 0))
  const handleFinish = () => {
    // Guardar también en el perfil público (mock: user_profile_data)
    localStorage.setItem("user_profile_data", JSON.stringify(form))
    setSuccess(true)
    setTimeout(() => {
      router.push("/dashboard/client/profile")
    }, 1200)
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Setting</h1>
      <div className="flex justify-between mb-8">
        {steps.map((label, i) => (
          <div key={i} className={`flex-1 text-center ${i === step ? "font-bold text-purple-600" : "text-gray-400"}`}>{label}</div>
        ))}
      </div>
      {!success ? (
        <div className="bg-white rounded-xl shadow p-8">
          {step === 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Preferencias generales</h2>
              <label className="block mb-2">¿Para qué usas Ganway?</label>
              <div className="flex gap-4 mb-4">
                {["Personal", "Profesional", "Ambos"].map(opt => (
                  <label key={opt}><input type="radio" name="experiencia" checked={form.preferencias.experiencia === opt} onChange={() => handleChange("preferencias", "experiencia", opt)} /> {opt}</label>
                ))}
              </div>
              <label className="block mb-2">¿Por qué quieres usar Ganway?</label>
              <div className="flex flex-col gap-2 mb-4">
                {MOTIVOS.map(opt => (
                  <label key={opt}><input type="radio" name="motivo" checked={form.preferencias.motivo === opt} onChange={() => handleChange("preferencias", "motivo", opt)} /> {opt}</label>
                ))}
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Datos personales</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Nombre</label>
                  <Input value={form.datos.nombre} onChange={e => handleChange("datos", "nombre", e.target.value)} />
                </div>
                <div>
                  <label className="block mb-1">Usuario</label>
                  <Input value={form.datos.usuario} onChange={e => handleChange("datos", "usuario", e.target.value)} />
                </div>
                <div>
                  <label className="block mb-1">Email</label>
                  <Input value={form.datos.email} onChange={e => handleChange("datos", "email", e.target.value)} />
                </div>
                <div>
                  <label className="block mb-1">Ciudad</label>
                  <Input value={form.datos.ciudad} onChange={e => handleChange("datos", "ciudad", e.target.value)} />
                </div>
                <div>
                  <label className="block mb-1">País</label>
                  <Input value={form.datos.país} onChange={e => handleChange("datos", "país", e.target.value)} />
                </div>
                <div>
                  <label className="block mb-1">Género</label>
                  <select value={form.datos.genero} onChange={e => handleChange("datos", "genero", e.target.value)} className="w-full border rounded p-2">
                    <option value="">Selecciona</option>
                    {GENEROS.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Intereses y estilos</h2>
              <label className="block mb-1">Intereses</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {INTERESES.map(opt => (
                  <button key={opt} type="button" onClick={() => handleTagToggle("intereses", opt)} className={`px-3 py-1 rounded-full border ${form.intereses.intereses.includes(opt) ? "bg-purple-600 text-white border-purple-600" : "bg-gray-100 text-gray-700 border-gray-300"}`}>{opt}</button>
                ))}
              </div>
              <label className="block mb-1">Estilos favoritos</label>
              <div className="flex flex-wrap gap-2">
                {ESTILOS.map(opt => (
                  <button key={opt} type="button" onClick={() => handleTagToggle("estilos", opt)} className={`px-3 py-1 rounded-full border ${form.intereses.estilos.includes(opt) ? "bg-purple-600 text-white border-purple-600" : "bg-gray-100 text-gray-700 border-gray-300"}`}>{opt}</button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Privacidad y seguridad</h2>
              <label className="block mb-1">Visibilidad de perfil</label>
              <div className="flex gap-4 mb-4">
                {VISIBILIDAD.map(opt => (
                  <label key={opt}><input type="radio" name="visibilidad" checked={form.privacidad.visibilidad === opt} onChange={() => handleChange("privacidad", "visibilidad", opt)} /> {opt}</label>
                ))}
              </div>
              <label className="block mb-1">Cambiar contraseña</label>
              <Input type="password" value={form.privacidad.password} onChange={e => handleChange("privacidad", "password", e.target.value)} />
            </div>
          )}
          <div className="flex justify-between mt-8">
            <Button onClick={handlePrev} disabled={step === 0} variant="outline">Anterior</Button>
            {step < steps.length - 1 ? (
              <Button onClick={handleNext} className="bg-purple-600 text-white">Siguiente</Button>
            ) : (
              <Button onClick={handleFinish} className="bg-purple-600 text-white">Finalizar</Button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¡Configuración guardada!</h2>
          <p className="mb-4">Tus preferencias han sido guardadas correctamente.</p>
        </div>
      )}
    </div>
  )
} 
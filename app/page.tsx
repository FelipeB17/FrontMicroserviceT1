"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Mail, Phone, CreditCard, User } from "lucide-react"

// Datos de ejemplo
const usuariosIniciales = [
  {
    id: 1,
    nombre: "Ana García López",
    cedula: "12.345.678",
    correo: "ana.garcia@email.com",
    numero: "+57 300 123 4567",
  },
  {
    id: 2,
    nombre: "Carlos Rodríguez",
    cedula: "23.456.789",
    correo: "carlos.rodriguez@email.com",
    numero: "+57 301 234 5678",
  },
  {
    id: 3,
    nombre: "María Fernández",
    cedula: "34.567.890",
    correo: "maria.fernandez@email.com",
    numero: "+57 302 345 6789",
  },
  {
    id: 4,
    nombre: "Luis Martínez Silva",
    cedula: "45.678.901",
    correo: "luis.martinez@email.com",
    numero: "+57 303 456 7890",
  },
]

export default function HomePage() {
  const [usuarios, setUsuarios] = useState(usuariosIniciales)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    correo: "",
    numero: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.nombre && formData.cedula && formData.correo && formData.numero) {
      const nuevoUsuario = {
        id: usuarios.length + 1,
        ...formData,
      }
      setUsuarios((prev) => [...prev, nuevoUsuario])
      setFormData({ nombre: "", cedula: "", correo: "", numero: "" })
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header con botón */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Gestión de Usuarios</h1>
            <p className="text-slate-600">Administra y visualiza la información de los usuarios</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4" />
                Agregar usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-slate-900">Agregar Nuevo Usuario</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-slate-700">
                    Nombre completo
                  </Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ej: Ana García López"
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cedula" className="text-slate-700">
                    Cédula
                  </Label>
                  <Input
                    id="cedula"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleInputChange}
                    placeholder="Ej: 12.345.678"
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="correo" className="text-slate-700">
                    Correo electrónico
                  </Label>
                  <Input
                    id="correo"
                    name="correo"
                    type="email"
                    value={formData.correo}
                    onChange={handleInputChange}
                    placeholder="Ej: ana.garcia@email.com"
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero" className="text-slate-700">
                    Número de teléfono
                  </Label>
                  <Input
                    id="numero"
                    name="numero"
                    value={formData.numero}
                    onChange={handleInputChange}
                    placeholder="Ej: +57 300 123 4567"
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    Agregar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabla de usuarios - Vista desktop */}
        <Card className="hidden md:block shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
            <CardTitle className="text-lg font-semibold text-slate-800">Lista de Usuarios</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-slate-50/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-blue-500" />
                        Nombre
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-blue-500" />
                        Cédula
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-500" />
                        Correo
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-blue-500" />
                        Número
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario, index) => (
                    <tr
                      key={usuario.id}
                      className={`border-b transition-colors hover:bg-blue-50/50 ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{usuario.nombre}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-600">{usuario.cedula}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-600">{usuario.correo}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-600">{usuario.numero}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Vista móvil - Cards */}
        <div className="grid gap-4 md:hidden">
          {usuarios.map((usuario) => (
            <Card key={usuario.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-slate-900">{usuario.nombre}</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-blue-500" />
                      <span className="text-slate-600">Cédula:</span>
                      <span className="text-slate-900">{usuario.cedula}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-500" />
                      <span className="text-slate-600">Correo:</span>
                      <span className="text-slate-900 break-all">{usuario.correo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-blue-500" />
                      <span className="text-slate-600">Número:</span>
                      <span className="text-slate-900">{usuario.numero}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

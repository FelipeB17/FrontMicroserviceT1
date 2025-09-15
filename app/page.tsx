"use client"

import type React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Mail, Phone, CreditCard, User, Trash2, Search, Edit } from "lucide-react"

const API_URL = "http://35.231.186.103:8081/api/usuario"

export default function HomePage() {
  const [usuarios, setUsuarios] = useState<any[]>([])
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<any[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    correo: "",
    numero: "",
  })
  const [editFormData, setEditFormData] = useState({
    nombre: "",
    cedula: "",
    correo: "",
    numero: "",
  })
  const [cedulaBusqueda, setCedulaBusqueda] = useState("")
  const [cedulaEditando, setCedulaEditando] = useState("")

  // 🔹 Cargar lista de usuarios al inicio
  useEffect(() => {
    console.log("fecth");
    
    fetchUsuarios()
  }, [])

  // 🔹 Efecto para búsqueda dinámica
  useEffect(() => {
    if (!cedulaBusqueda) {
      setUsuariosFiltrados(usuarios)
    } else {
      const filtrados = usuarios.filter(usuario => 
        usuario.cedula.toLowerCase().includes(cedulaBusqueda.toLowerCase())
      )
      setUsuariosFiltrados(filtrados)
    }
  }, [cedulaBusqueda, usuarios])

  const fetchUsuarios = async () => {
    try {
      const res = await axios.get(API_URL)
      console.log(res);
      
      setUsuarios(res.data)
      setUsuariosFiltrados(res.data)
    } catch (error) {
      console.error("Error al obtener usuarios:", error)
    }
  }

  // 🔹 Manejar cambios en inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 🔹 Manejar cambios en inputs de edición
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 🔹 Agregar usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(API_URL, formData)
      fetchUsuarios()
      setFormData({ nombre: "", cedula: "", correo: "", numero: "" })
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error al agregar usuario:", error)
    }
  }

  // 🔹 Abrir modal de edición
  const handleEdit = (usuario: any) => {
    setEditFormData({
      nombre: usuario.nombre,
      cedula: usuario.cedula,
      correo: usuario.correo,
      numero: usuario.numero,
    })
    setCedulaEditando(usuario.cedula)
    setIsEditDialogOpen(true)
  }

  // 🔹 Actualizar usuario
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.put(`${API_URL}/${cedulaEditando}`, editFormData)
      fetchUsuarios()
      setEditFormData({ nombre: "", cedula: "", correo: "", numero: "" })
      setIsEditDialogOpen(false)
      setCedulaEditando("")
    } catch (error) {
      console.error("Error al actualizar usuario:", error)
    }
  }

  // 🔹 Eliminar usuario por cédula
  const handleDelete = async (cedula: string) => {
    try {
      await axios.delete(`${API_URL}/${cedula}`)
      fetchUsuarios()
    } catch (error) {
      console.error("Error al eliminar usuario:", error)
    }
  }

  // 🔹 Buscar usuario por cédula (funcionalidad original mantenida)
  const handleBuscar = async () => {
    if (!cedulaBusqueda) {
      fetchUsuarios()
      return
    }
    try {
      const res = await axios.get(`${API_URL}/${cedulaBusqueda}`)
      setUsuarios([res.data])
      setUsuariosFiltrados([res.data])
    } catch (error) {
      console.error("No se encontró el usuario:", error)
      setUsuarios([])
      setUsuariosFiltrados([])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header con botón y búsqueda */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Gestión de Usuarios</h1>
            <p className="text-slate-600">Administra y visualiza la información de los usuarios</p>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Buscar por cédula (dinámico)"
              value={cedulaBusqueda}
              onChange={(e) => setCedulaBusqueda(e.target.value)}
              className="w-48"
            />
            <Button onClick={handleBuscar} className="bg-indigo-600 text-white">
              <Search className="h-4 w-4" />
            </Button>

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
                    <Label htmlFor="nombre">Nombre completo</Label>
                    <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cedula">Cédula</Label>
                    <Input id="cedula" name="cedula" value={formData.cedula} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="correo">Correo</Label>
                    <Input id="correo" name="correo" type="email" value={formData.correo} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numero">Número</Label>
                    <Input id="numero" name="numero" value={formData.numero} onChange={handleInputChange} required />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" className="bg-blue-600 text-white">
                      Agregar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Dialog de Edición */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-slate-900">Editar Usuario</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nombre">Nombre completo</Label>
                <Input id="edit-nombre" name="nombre" value={editFormData.nombre} onChange={handleEditInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-cedula">Cédula</Label>
                <Input id="edit-cedula" name="cedula" value={editFormData.cedula} onChange={handleEditInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-correo">Correo</Label>
                <Input id="edit-correo" name="correo" type="email" value={editFormData.correo} onChange={handleEditInputChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-numero">Número</Label>
                <Input id="edit-numero" name="numero" value={editFormData.numero} onChange={handleEditInputChange} required />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-green-600 text-white">
                  Actualizar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Tabla de usuarios */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Lista de Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-slate-50/50">
                    <th className="px-6 py-3 text-left">Nombre</th>
                    <th className="px-6 py-3 text-left">Cédula</th>
                    <th className="px-6 py-3 text-left">Correo</th>
                    <th className="px-6 py-3 text-left">Número</th>
                    <th className="px-6 py-3 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.map((usuario) => (
                    <tr key={usuario.cedula} className="border-b hover:bg-blue-50">
                      <td className="px-6 py-3">{usuario.nombre}</td>
                      <td className="px-6 py-3">{usuario.cedula}</td>
                      <td className="px-6 py-3">{usuario.correo}</td>
                      <td className="px-6 py-3">{usuario.numero}</td>
                      <td className="px-6 py-3">
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEdit(usuario)}
                            className="text-green-600 hover:bg-green-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDelete(usuario.cedula)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
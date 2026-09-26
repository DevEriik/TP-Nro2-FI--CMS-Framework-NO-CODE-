import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { useTheme } from "@/components/theme-provider"
import { Sun, Moon, CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react"

export default function App() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border bg-background">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-base font-semibold tracking-tight text-primary">
              ExpertoYa!
            </span>
            <nav className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">
                Inicio
              </a>
              <a href="#" className="hover:text-foreground">
                Servicios
              </a>
              <a href="#" className="hover:text-foreground">
                Profesionales
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
              aria-label="Alternar modo oscuro"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-warning" />
              ) : (
                <Moon className="h-4 w-4 text-primary" />
              )}
            </Button>
            <Button variant="outline" size="sm">
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10 space-y-10">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Plataforma de Servicios
          </h1>
          <p className="text-sm text-muted-foreground">
            Estado base del template con componentes desacoplados de Shadcn/ui.
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Plomería y Gas</CardTitle>
              <CardDescription>
                Martín Benítez • Matrícula Profesional
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Reparaciones de cañerías, destapes integrales e instalación de
                artefactos certificados.
              </p>
              <p className="text-xs text-foreground font-medium">
                Zona: Neuquén Capital y alrededores
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                Disponibilidad inmediata
              </span>
              <Button variant="outline" size="sm">
                Ver Perfil
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Electricidad Integral</CardTitle>
              <CardDescription>
                Clara Rossi • Técnica Electricista
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Montaje de tableros trifásicos, cableados domiciliarios y
                certificaciones de obra.
              </p>
              <p className="text-xs text-foreground font-medium">
                Zona: Cipolletti y Plottier
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                Presupuestos sin cargo
              </span>
              <Button variant="outline" size="sm">
                Ver Perfil
              </Button>
            </CardFooter>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle>Solicitud de Cotización</CardTitle>
              <CardDescription>
                Formulario estándar para coordinar una visita técnica.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre completo</Label>
                    <Input id="nombre" placeholder="Ej: Juan Pérez" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="servicio">Oficio requerido</Label>
                    <Input id="servicio" placeholder="Ej: Electricidad" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="detalle">Descripción del problema</Label>
                  <Input
                    id="detalle"
                    placeholder="Detalla brevemente el trabajo que necesitas cotizar"
                  />
                </div>

                <div className="pt-2">
                  <Button type="button">
                    Enviar Solicitud
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Sección: Estados del Sistema (Demostración de Colores Semánticos) */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">
              Estados del Sistema
            </h2>
            <p className="text-sm text-muted-foreground">
              Demostración visual de alertas de estado utilizando los tokens semánticos oficiales de ExpertoYa! en modo claro y oscuro.
            </p>
          </div>

          <div className="space-y-3">
            {/* Alerta de Éxito (Success - Verde) */}
            <Alert variant="success">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Operación Exitosa</AlertTitle>
              <AlertDescription>
                Tu solicitud de cotización ha sido confirmada con éxito. El profesional matriculado se contactará a la brevedad.
              </AlertDescription>
            </Alert>

            {/* Alerta de Advertencia (Warning - Amarillo / Naranja) */}
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Alta Demanda en la Zona</AlertTitle>
              <AlertDescription>
                Atención: Alta concurrencia de pedidos en este rubro. El tiempo estimado de respuesta puede demorar hasta 24 horas hábiles.
              </AlertDescription>
            </Alert>

            {/* Alerta de Error (Danger/Destructive - Rojo) */}
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error en la Validación</AlertTitle>
              <AlertDescription>
                No se pudo procesar la solicitud. Por favor verifica que los campos obligatorios del formulario estén completos y vuelve a intentar.
              </AlertDescription>
            </Alert>
          </div>
        </section>
      </main>
    </div>
  )
}

import React, { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Star,
  MessageSquare,
  Calendar,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface ReseniaItem {
  id: number;
  solicitud_id: number;
  calificacion: number;
  comentario: string;
  fecha_creacion: string;
  cliente_nombre: string;
  servicio_realizado: string;
}

interface ResenasListProps {
  profesionalId: string | number;
  profesionalNombre: string;
  actualizarTrigger?: number;
}

export const ResenasList: React.FC<ResenasListProps> = ({
  profesionalId,
  profesionalNombre,
  actualizarTrigger = 0,
}) => {
  const [promedio, setPromedio] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [resenas, setResenas] = useState<ReseniaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cargarResenas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `http://localhost:3001/api/resenas/profesional/${profesionalId}`,
      );
      if (!res.ok) {
        throw new Error("Error al cargar las calificaciones del profesional.");
      }
      const data = await res.json();
      setPromedio(data.promedio || 0);
      setTotal(data.total_resenas || 0);
      setResenas(data.resenas || []);
    } catch (err: any) {
      setError(err.message || "Error de conexión");
    } finally {
      setLoading(false);
    }
  }, [profesionalId]);

  useEffect(() => {
    cargarResenas();
  }, [cargarResenas, actualizarTrigger]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground gap-2">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <span className="text-sm">Cargando opiniones verificadas...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 p-4 text-xs text-destructive bg-destructive/10 rounded-lg border border-destructive/20">
        <AlertCircle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card text-card-foreground border-border shadow-xs">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex flex-col items-center justify-center bg-primary/10 border border-primary/20 rounded-xl w-20 h-20 sm:w-24 sm:h-24 shrink-0">
                <span className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                  {promedio.toFixed(1)}
                </span>
                <span className="text-[10px] sm:text-[11px] text-muted-foreground font-medium">
                  de 5.0
                </span>
              </div>
              <div className="space-y-1 text-left">
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  Opiniones de {profesionalNombre}
                </h3>
                <div className="flex flex-wrap items-center gap-1">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          Math.round(promedio) >= star
                            ? "fill-primary text-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-1 sm:ml-2 font-medium">
                    Basado en {total} {total === 1 ? "opinión" : "opiniones"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/15 rounded-lg border border-secondary/30 text-xs font-semibold text-secondary-foreground dark:text-secondary self-start sm:self-auto">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse" />
              100% Opiniones Verificadas
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {resenas.length === 0 ? (
          <div className="text-center py-10 bg-muted/30 border border-dashed border-border rounded-xl">
            <MessageSquare className="h-8 w-8 text-muted-foreground/50 mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">
              Aún no hay calificaciones para este profesional.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Las reseñas aparecerán aquí una vez que los clientes califiquen
              sus trabajos finalizados.
            </p>
          </div>
        ) : (
          resenas.map((resena) => (
            <Card key={resena.id} className="border-border">
              <CardHeader className="pb-2 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                      {resena.cliente_nombre.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span>{resena.cliente_nombre}</span>
                        <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          Cliente Verificado
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Servicio: {resena.servicio_realizado}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 pl-10 sm:pl-0">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3.5 w-3.5 ${
                          resena.calificacion >= star
                            ? "fill-primary text-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2 text-sm text-foreground/90 p-4 sm:p-6 pt-0">
                <p className="italic font-light">"{resena.comentario}"</p>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>
                    {new Date(resena.fecha_creacion).toLocaleDateString(
                      "es-AR",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

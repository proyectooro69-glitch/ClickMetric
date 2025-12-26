import { motion } from "framer-motion";
import { Link2, Copy, ArrowRight, ExternalLink, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { StatsDialog } from "./stats-dialog";

interface LinkCardProps {
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

export function LinkCard({ originalUrl, shortCode, clicks, createdAt }: LinkCardProps) {
  const { toast } = useToast();
  const shortUrl = `${window.location.protocol}//${window.location.host}/${shortCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast({
      title: "¡Copiado al portapapeles!",
      description: "El enlace acortado está listo para compartir.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <Card className="glass-panel overflow-hidden border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-display tracking-tight text-white">
                /{shortCode}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/20">
                Activo
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground truncate">
              <Link2 className="w-3 h-3" />
              <span className="truncate max-w-[200px] sm:max-w-[300px]">{originalUrl}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
             <div className="hidden sm:flex flex-col items-end mr-4 text-right">
              <StatsDialog 
                shortCode={shortCode} 
                originalUrl={originalUrl} 
                totalClicks={clicks} 
                createdAt={createdAt} 
              />
            </div>
            
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 border-white/10 hover:bg-white/10 hover:text-white"
              onClick={() => window.open(shortUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
            
            <Button
              className="shrink-0 bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_-5px_hsl(280_80%_60%)]"
              onClick={copyToClipboard}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copiar
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

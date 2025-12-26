import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BarChart3, Clock, Globe, MousePointer2 } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StatsDialogProps {
  shortCode: string;
  originalUrl: string;
  totalClicks: number;
  createdAt: string;
}

// Mock data for the chart
const chartData = [
  { name: "Lun", clicks: 4 },
  { name: "Mar", clicks: 7 },
  { name: "Mié", clicks: 15 },
  { name: "Jue", clicks: 12 },
  { name: "Vie", clicks: 23 },
  { name: "Sáb", clicks: 18 },
  { name: "Dom", clicks: 28 },
];

// Mock data for recent clicks
const recentClicks = [
  { id: 1, ip: "192.168.1.x", location: "Madrid, ES", time: "Hace 2 min", device: "Chrome / Windows" },
  { id: 2, ip: "172.16.0.x", location: "Barcelona, ES", time: "Hace 15 min", device: "Safari / iPhone" },
  { id: 3, ip: "10.0.0.x", location: "Valencia, ES", time: "Hace 1 hora", device: "Firefox / Mac" },
  { id: 4, ip: "192.168.0.x", location: "Sevilla, ES", time: "Hace 3 horas", device: "Edge / Windows" },
  { id: 5, ip: "127.0.0.1", location: "Bilbao, ES", time: "Hace 5 horas", device: "Chrome / Android" },
];

export function StatsDialog({ shortCode, originalUrl, totalClicks, createdAt }: StatsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-white hover:bg-white/10"
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Estadísticas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-background/95 backdrop-blur-xl border-white/10 text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-display flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Estadísticas para /{shortCode}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground truncate">
            {originalUrl}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Card className="p-4 bg-white/5 border-white/10">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <MousePointer2 className="w-4 h-4" />
              Total Clics
            </div>
            <div className="text-2xl font-bold text-white mt-1">{totalClicks}</div>
          </Card>
          <Card className="p-4 bg-white/5 border-white/10">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Creado
            </div>
            <div className="text-xl font-bold text-white mt-1">{createdAt}</div>
          </Card>
        </div>

        <div className="mt-6 h-[200px] w-full">
          <h3 className="text-sm font-medium mb-4 text-muted-foreground">Actividad Reciente</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(280 80% 60%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(280 80% 60%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `${value}`} 
              />
              <Tooltip
                contentStyle={{ backgroundColor: 'hsl(260 40% 15%)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area 
                type="monotone" 
                dataKey="clicks" 
                stroke="hsl(280 80% 60%)" 
                fillOpacity={1} 
                fill="url(#colorClicks)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3 text-muted-foreground">Últimos Visitantes</h3>
          <ScrollArea className="h-[150px] pr-4">
            <div className="space-y-3">
              {recentClicks.map((click) => (
                <div key={click.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{click.location}</div>
                      <div className="text-xs text-muted-foreground">{click.device}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    <div>{click.time}</div>
                    <div className="font-mono opacity-50">{click.ip}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}

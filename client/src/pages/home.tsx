import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Link as LinkIcon, Github } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkCard } from "@/components/link-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import heroBg from "@assets/generated_images/abstract_digital_gradient_background_with_glassmorphism_elements.png";

const formSchema = z.object({
  url: z.string().url({ message: "Por favor ingresa una URL válida (ej. https://ejemplo.com)" }),
});

interface ShortenedLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

export default function Home() {
  const [links, setLinks] = useState<ShortenedLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    const newLink: ShortenedLink = {
      id: Math.random().toString(36).substring(7),
      originalUrl: values.url,
      shortCode: Math.random().toString(36).substring(2, 8),
      clicks: 0,
      createdAt: "Hace un momento",
    };

    setLinks((prev) => [newLink, ...prev]);
    setIsLoading(false);
    form.reset();
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden selection:bg-primary/30">
      {/* Background with overlay */}
      <div 
        className="fixed inset-0 z-[-1] opacity-40 mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Navbar */}
      <nav className="w-full border-b border-white/5 backdrop-blur-sm bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <LinkIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-white">
              LinkShrink
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-white hover:bg-white/5">
              Iniciar Sesión
            </Button>
            <Button className="hidden sm:flex bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12 md:py-24 flex flex-col items-center">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-6 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm text-secondary mb-4">
            <Sparkles className="w-3 h-3" />
            <span className="font-medium">Nuevo: Panel de Analíticas 2.0</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight tracking-tight text-white glow-text">
            Acorta enlaces, <br />
            <span className="text-gradient">expande tu alcance.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Un potente acortador de URLs creado para el marketing moderno. Rastrea clics, analiza datos y gestiona tus enlaces con nuestra interfaz de cristal.
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-2xl mx-auto mb-16"
        >
          <div className="glass-panel p-2 rounded-2xl relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500" />
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex flex-col sm:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input 
                          placeholder="Pega tu enlace largo aquí..." 
                          className="h-12 sm:h-14 bg-background/50 border-transparent focus:border-primary/50 text-lg placeholder:text-muted-foreground/50 rounded-xl"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="absolute -bottom-6 left-2 text-xs" />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-12 sm:h-14 px-8 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-lg shadow-[0_0_30px_-10px_hsl(280_80%_60%)] transition-all hover:scale-[1.02]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Acortar <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>

        {/* Results Section */}
        <div className="w-full max-w-3xl mx-auto space-y-4">
          <AnimatePresence mode="popLayout">
            {links.map((link) => (
              <LinkCard 
                key={link.id} 
                {...link} 
              />
            ))}
          </AnimatePresence>

          {links.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center py-12 text-muted-foreground/50"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <LinkIcon className="w-8 h-8 opacity-20" />
              </div>
              <p>Aún no hay enlaces acortados. ¡Intenta pegar uno arriba!</p>
            </motion.div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 LinkShrink. Creado con React y Tailwind.</p>
        </div>
      </footer>
    </div>
  );
}

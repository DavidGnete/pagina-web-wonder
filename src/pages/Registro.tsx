
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PlateRecord } from '../types';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  plateNumber: z.string().min(2, {
    message: "La placa debe tener al menos 2 caracteres.",
  }).max(10, {
    message: "La placa no puede tener más de 10 caracteres.",
  }),
  location: z.string().optional(),
});

const Registro: React.FC = () => {
  const [lastRecord, setLastRecord] = useState<PlateRecord | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plateNumber: "",
      location: "Entrada Principal",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newRecord: PlateRecord = {
      id: Date.now().toString(),
      plateNumber: values.plateNumber.toUpperCase(),
      timestamp: new Date(),
      confidence: 1, // Confianza máxima al ser registro manual
      location: values.location,
    };

    setLastRecord(newRecord);
    toast.success('Placa registrada con éxito');
    form.reset();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Registro Manual de Placas</h1>
          <p className="text-gray-600">Registre manualmente los números de placas de vehículos</p>
        </div>
        
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="plateNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Placa</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ingrese la placa (ej. ABC123)" 
                            {...field}
                            className="text-xl uppercase" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ubicación</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ubicación del registro" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">Registrar Placa</Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 h-full">
              <h2 className="text-xl font-semibold mb-4">Último Registro</h2>
              
              {lastRecord ? (
                <div className="space-y-4">
                  <div className="plate-result text-center p-4 bg-gray-100 rounded-md text-2xl font-bold">
                    {lastRecord.plateNumber}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Ubicación:</span>
                      <span className="font-medium">{lastRecord.location || 'Desconocida'}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Fecha y Hora:</span>
                      <span className="font-medium">{lastRecord.timestamp.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-center text-gray-500">
                  <div>
                    <p>No hay registros todavía</p>
                    <p className="text-sm mt-1">Complete el formulario para registrar una placa</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Registro;

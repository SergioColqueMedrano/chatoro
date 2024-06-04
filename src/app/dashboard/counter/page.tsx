// pages/index.tsx

import MessageDashboard from "@/app/components/MessageDashboard";

export default function Home() {
  const userId = 1; // Replace this with the actual logged-in user's ID

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Mensajería entre Usuarios </h1>
      <MessageDashboard userId={userId} />
    </div>
  );
}



{/* 
import CounterDashboard from '@/pages/dashboard/counterchat'

export const metadata = {
    title: 'Counter Page',
    description: 'Un simple contador'
  };  

export default function CounterPage() {

  //Base de datos
  

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1>Producto en el carrito</h1>
        <CounterDashboard />
    </div>
  );
}
*/}
import { Divider } from '@nextui-org/react';
import { MonitorCog } from 'lucide-react';

const MobileVersion = () => {
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-primary text-secondary md:hidden">
      <div className="">
        <div className="flex justify-center mb-4">
          <MonitorCog size={60} className="text-white" />
        </div>
        <p className="text-2xl text-center font-semibold">Opps, sorry</p>
        <p className="text-lg text-center">Mobile version not yet available</p>
        <Divider className=" bg-white my-4" />
        <p className="text-lg text-center">Please move to desktop!</p>
      </div>
    </main>
  );
};
export default MobileVersion;

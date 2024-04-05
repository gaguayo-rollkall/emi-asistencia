import Breadcrumbs from '../../components/Breadcrumbs';

export default function Control() {
  return (
    <main className="w-full h-full flex-grow p-6 relative">
      <Breadcrumbs items={['Inicio', 'Control']} />
    </main>
  );
}
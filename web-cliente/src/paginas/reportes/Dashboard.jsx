import SelectorFechas from './fake/SelectorFechas';
import Columnas from './fake/Columnas'
import Bubbles from './fake/Bubbles'

export default function Dashboard() {
  return (
    <main className="w-full h-full flex-grow p-6">
      <div className="card w-7/8 bg-base-100 shadow-xl">
        <div className="card-body">
          <SelectorFechas />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="card w-3/6 bg-base-100 shadow-xl mt-6">
          <div className='card-body'>
            <Columnas />
          </div>
        </div>

        <div className="card w-3/6 bg-base-100 shadow-xl mt-6">
          <div className='card-body'>
            <Bubbles />
          </div>
        </div>
      </div>
    </main>
  )
}
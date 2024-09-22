import MatrixBackground from './components/MatrixBackground'

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-24">
      <MatrixBackground />
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-center text-cyan-400">Cryo-Digital Nexus</h1>
        <p className="text-xl text-center text-cyan-200 mt-4">Where data flows like ice through quantum circuits</p>
      </div>
    </main>
  )
}
export default function Loading() {
    return (
      <section className="w-full h-screen bg-gradient-to-r from-blue-500 to-green-500 animate-gradient-x">
        <div className="container mx-auto px-4 md:px-6 py-12 h-full flex items-center justify-center">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">Loading...</h1>
            </div>
          </div>
      </section>
    )
  }
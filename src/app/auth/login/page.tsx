// app/login/page.tsx

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh_-_420px)] flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-[32px] overflow-hidden shadow-2xl grid lg:grid-cols-2">
        
        {/* Left Side */}
        <div className=" lg:flex bg-[#ec4899] items-center justify-center p-10 relative">
          <div className="absolute w-72 h-72 bg-pink-300/30 blur-3xl rounded-full"></div>

          <div className="relative z-10 text-white">
            <h1 className="text-5xl font-bold leading-tight">
              Welcome <br />
              Back
            </h1>

            <p className="mt-5 text-pink-100 text-lg max-w-sm">
              Login with your mobile number and continue shopping.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-md">
            
            {/* Heading */}
            <div className="mb-10">
              <h2 className="text-4xl font-bold text-gray-800">
                Login
              </h2>

              <p className="text-gray-500 mt-3">
                Enter your mobile number to get OTP
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6">
              
              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>

                <input
                  type="text"
                  placeholder="+8801XXXXXXXXX"
                  className="w-full h-14 rounded-2xl border border-pink-200 px-5 outline-none focus:border-[#ec4899] focus:ring-4 focus:ring-pink-100 transition"
                />
              </div>

              {/* OTP Button */}
              <button
                type="submit"
                className="w-full h-14 rounded-2xl bg-[#ec4899] hover:bg-pink-600 text-white font-semibold text-lg transition"
              >
                Send OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
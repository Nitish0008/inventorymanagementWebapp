function RegisterPage() {
  return (
    <div className="flex justify-center items-center mix-blend-screen h-screen">
      <div className="card lg:card-side bg-base-100 shadow-sm shadow-amber-100 w-full max-w-3xl">
        <figure className="w-1/2">
          <img
            src="https://thumbs.dreamstime.com/b/shopping-cart-placed-laptop-computer-store-under-lies-surrounded-items-like-water-flooring-wood-pet-supplies-322820707.jpg"
            alt="Album"
            className="object-cover h-full w-full"
          />
        </figure>
        <div className="card-body w-1/2">
          <h2 className="card-title">Register</h2>
          <input
            type="text"
            placeholder="Enter your Name "
            className="input input-success mb-4"
          />
          <input
            type="text"
            placeholder="Enter your email "
            className="input input-success mb-4"
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-success"
          />
          <div className="card-actions mt-4">
            <button className="btn btn-primary w-full">Submit</button>
          </div>
          <p>Already have an account? <a href="/" className="text-blue-500">LogIn</a></p>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;
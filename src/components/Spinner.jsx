import logo from './weirdo.jpg';

const Spinner = () => {
  return(
    <div style={{ display:"flex", justifyContent:"center", margin: "3rem" }}>
      <img className="load-spinner" src={logo} alt="Logo" />
    </div>
  )
}

export { Spinner };